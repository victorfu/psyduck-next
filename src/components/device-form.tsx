"use client";

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
import { useState } from "react";
import { updateDevice } from "@/lib/actions";
import { PATHNAME_DEVICE } from "@/lib/constants";
import { Textarea } from "./ui/textarea";

const formSchema = z.object({
  name: z.string(),
  description: z.string(),
});

export default function DeviceForm({ device }: { device: Device }) {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      name: device.name,
      description: device.description,
    },
  });
  const [pending, setPending] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { name, description } = values;
    try {
      setPending(true);
      await updateDevice(
        device.id,
        {
          name,
          description,
        },
        `${PATHNAME_DEVICE}/${device.id}`,
      );
    } catch (error) {
      console.error("Error adding device:", error);
    } finally {
      setPending(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="name" {...field} autoComplete="off" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="description"
                  {...field}
                  autoComplete="off"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={pending}>
          {pending ? "Saving..." : "Save"}
        </Button>
      </form>
    </Form>
  );
}
