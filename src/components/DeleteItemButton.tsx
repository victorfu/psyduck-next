"use client";

import { actionDeleteItem } from "@/app/(main)/administration/items/actions";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

const DeleteItemButton = ({ item }: { item: Item }) => {
  const { pending } = useFormStatus();
  return (
    <button
      className="w-6 h-6 rounded-full bg-red-500 text-white hover:bg-red-600"
      onClick={() => actionDeleteItem(item.id)}
      disabled={pending}
    >
      X
    </button>
  );
};

export default DeleteItemButton;
