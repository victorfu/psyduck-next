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
import { Label } from "@/components/ui/label";
import { CopyIcon } from "@radix-ui/react-icons";

const formSchema = z.object({
  providerId: z.string().min(1, {
    message: "Username must be at least 1 character.",
  }),
  ses: z.string().min(1, {
    message: "Username must be at least 1 character.",
  }),
});

export default function LineBotList() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      providerId: "",
      ses: "",
    },
  });
  const [bots, setBots] = useState<Bot[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedBot, setSelectedBot] = useState<BotDetail | null>(null);

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
    setBots(data);
  }

  const LineBotCard = ({ bot }: { bot: Bot }) => {
    const onCardClick = async () => {
      const { id } = bot;
      const ses = localStorage.getItem("ses") ?? "";
      const data = await fetchBotDetail(id, ses);
      console.log(data);
      setSelectedBot(data);
      setOpen(true);
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
      <Dialog open={open} onOpenChange={setOpen}>
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
            <Button type="submit" size="sm" className="px-3">
              <span className="sr-only">Copy</span>
              <CopyIcon className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="channel-secret">Channel Secret</Label>
              <Input
                id="channel-secret"
                defaultValue={selectedBot.secret}
                readOnly
              />
            </div>
            <Button type="submit" size="sm" className="px-3">
              <span className="sr-only">Copy</span>
              <CopyIcon className="h-4 w-4" />
            </Button>
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
              <Button type="submit" size="sm" className="px-3">
                <span className="sr-only">Copy</span>
                <CopyIcon className="h-4 w-4" />
              </Button>
            </div>
          )}

          <Button type="button" onClick={() => setOpen(false)}>
            Add
          </Button>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div>
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
                <FormLabel>Token</FormLabel>
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
          {bots.map((bot) => (
            <li
              key={bot.id}
              className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
            >
              <LineBotCard bot={bot} />
            </li>
          ))}
        </ul>
      </div>
      <ConfirmDialog />
    </div>
  );
}
