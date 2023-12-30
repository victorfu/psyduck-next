"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./button";

function SearchButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Search..." : "Search"}
    </Button>
  );
}

export default SearchButton;
