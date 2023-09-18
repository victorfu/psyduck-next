"use client";

import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { Button } from "./button";

function SaveButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save"}
    </Button>
  );
}

export default SaveButton;
