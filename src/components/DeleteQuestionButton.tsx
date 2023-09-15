"use client";

import { deleteQuestion } from "@/lib/actions";
import { PATHNAME_HISTORY } from "@/utils/constants";

function DeleteQuestionButton({ id }: { id: string }) {
  return (
    <button
      type="submit"
      className="inline-flex items-center rounded-md bg-red-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
      onClick={async () => {
        await deleteQuestion(id, PATHNAME_HISTORY);
        console.log("Delete question");
      }}
    >
      X
    </button>
  );
}

export default DeleteQuestionButton;
