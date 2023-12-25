"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./button";

function AskButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Asking..." : "Ask"}
    </Button>
  );
}

export default AskButton;
