"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchBotDetail, fetchBotList } from "@/lib/apis";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import AddLineBotButton from "./ui/add-line-bot-button";

const formSchema = z.object({
  providerId: z.string().min(1, {
    message: "Username must be at least 1 character.",
  }),
  ses: z.string().min(1, {
    message: "Username must be at least 1 character.",
  }),
});

export default function LineBotDrawer() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      providerId: "",
      ses: "",
    },
  });
  const [lineBots, setLineBots] = useState<LineBot[]>([]);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedBot, setSelectedBot] = useState<LineBot | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      form.setValue("providerId", localStorage.getItem("providerId") ?? "");
      form.setValue("ses", localStorage.getItem("ses") ?? "");
    }
  }, [form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { providerId, ses } = values;
    localStorage.setItem("providerId", providerId);
    localStorage.setItem("ses", ses);
    const data = await fetchBotList(providerId, ses);

    setLineBots(data.filter((bot) => bot.productTypes.includes("BOT")));
  }

  const LineBotCard = ({ bot }: { bot: LineBot }) => {
    const onCardClick = async () => {
      const { id } = bot;
      const ses = localStorage.getItem("ses") ?? "";
      const data = await fetchBotDetail(id, ses);
      setSelectedBot(data);
      setConfirmDialogOpen(true);
    };

    return (
      <Card onClick={onCardClick} className="cursor-pointer">
        <CardHeader>
          <CardDescription className="flex justify-center">
            <Image
              className="h-20 w-20 rounded-full"
              src={bot.iconUrl}
              alt="bot image"
              width={80}
              height={80}
            />
          </CardDescription>
          <CardTitle>{bot.name}</CardTitle>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter>
          <p>{bot.productTypes}</p>
        </CardFooter>
      </Card>
    );
  };

  const ConfirmDialog = () => {
    if (!selectedBot) {
      return null;
    }
    return (
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedBot.name}</DialogTitle>
            <DialogDescription>{selectedBot.description}</DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="channel-id">Channel Id</Label>
              <Input id="channel-id" defaultValue={selectedBot.id} readOnly />
            </div>
          </div>
          <div className="flex items-center space-x-2 ju">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="channel-secret">Channel Secret</Label>
              <Input
                id="channel-secret"
                defaultValue={selectedBot.secret}
                readOnly
              />
            </div>
          </div>

          {selectedBot.issuedToken?.accessToken && (
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="channel-access-token">
                  Channel Access Token
                </Label>
                <Input
                  id="channel-access-token"
                  defaultValue={selectedBot.issuedToken.accessToken}
                  readOnly
                />
              </div>
            </div>
          )}

          <AddLineBotButton
            bot={selectedBot}
            onClick={() => setConfirmDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <>
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">Add LINE Bot</Button>
        </DrawerTrigger>
        <DrawerContent className="min-h-[80vh]">
          <DrawerHeader>
            <DrawerTitle>
              Enter your provider id and session token ses:
            </DrawerTitle>
          </DrawerHeader>
          <div className="pl-4 pr-4 pb-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex space-x-2 items-end"
              >
                <FormField
                  control={form.control}
                  name="providerId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Provider Id</FormLabel>
                      <FormControl>
                        <Input placeholder="provide id" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ses"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ses Token</FormLabel>
                      <FormControl>
                        <Input placeholder="ses" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Fetch</Button>
              </form>
            </Form>

            <div className="mt-5">
              <ul
                role="list"
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              >
                {lineBots.map((bot) => (
                  <li
                    key={bot.id}
                    className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
                  >
                    <LineBotCard bot={bot} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
      <ConfirmDialog />
    </>
  );
}
