"use client";

import { useState, useTransition } from "react";
import LoadingSpinner from "./loading-spinner";
import { addLineBot } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { PATHNAME_BOT } from "@/lib/constants";

const AddLineBotButton = ({
  bot,
  onClick,
}: {
  bot: LineBot;
  onClick?: () => void;
}) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  return (
    <>
      {isPending && <LoadingSpinner fullpage={true} />}
      <Button
        type="button"
        onClick={() => {
          startTransition(async () => {
            const { error } = await addLineBot(bot, PATHNAME_BOT);
            if (error) {
              setError(error as string);
              return;
            }
            if (onClick) {
              onClick();
            }
          });
        }}
      >
        Add
      </Button>
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
};

export default AddLineBotButton;
