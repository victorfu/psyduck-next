"use client";

import { actionAddItem } from "@/app/(main)/administration/items/actions";
import { useRef } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

const ItemForm = () => {
  const ref = useRef<HTMLFormElement>(null);
  const { pending } = useFormStatus();

  return (
    <div>
      <form
        ref={ref}
        className="flex flex-col items-start bg-white rounded-lg p-8 shadow-md"
        action={async (formData) => {
          await actionAddItem(formData);
          ref.current?.reset();
        }}
      >
        <label className="mb-2 text-lg font-semibold" htmlFor="title">
          Title
        </label>
        <input
          className="border border-gray-300 p-2 rounded-lg mb-6 focus:ring focus:ring-blue-200 w-full"
          type="text"
          name="title"
          id="title"
        />

        <label className="mb-2 text-lg font-semibold" htmlFor="description">
          Description
        </label>
        <input
          className="border border-gray-300 p-2 rounded-lg mb-6 focus:ring focus:ring-blue-200 w-full"
          type="text"
          name="description"
          id="description"
        />

        <button
          className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
          type="submit"
          disabled={pending}
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default ItemForm;
