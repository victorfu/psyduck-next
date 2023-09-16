"use client";

import { deleteQuestion } from "@/lib/actions";
import { PATHNAME_HISTORY } from "@/lib/constants";
import { Button } from "./button";

function DeleteQuestionButton({ id }: { id: string }) {
  return (
    <Button
      type="submit"
      className="w-5 h-5 p-0 inline-flex items-center rounded-full bg-red-600 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
      onClick={async () => {
        await deleteQuestion(id, PATHNAME_HISTORY);
      }}
    >
      X
    </Button>
  );
}

export default DeleteQuestionButton;
