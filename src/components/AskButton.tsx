"use client";

import { experimental_useFormStatus as useFormStatus } from "react-dom";

function AskButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      disabled={pending}
    >
      {pending ? "Asking..." : "Ask"}
    </button>
  );
}

export default AskButton;
