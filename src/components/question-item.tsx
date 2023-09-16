"use client";

import { formatIsoDate } from "@/lib/utils";
import { useState } from "react";
import { Button } from "./ui/button";
import { deleteQuestion } from "@/lib/actions";
import { PATHNAME_HISTORY } from "@/lib/constants";
import LoadingSpinner from "./ui/loading-spinner";

const QuestionItem = ({ questions }: { questions: Question[] }) => {
  const [deleting, setDeleting] = useState(false);

  return (
    <div className="w-full flex flex-col">
      {deleting && <LoadingSpinner />}
      {questions?.map((doc) => {
        const question = doc as Question;
        return (
          <div
            className={`flex items-center border border-gray-300 p-4 rounded-lg bg-gray-100 my-2 shadow-sm`}
            key={question.id}
          >
            <div className="flex-1">
              <div>
                <strong className="text-sm font-semibold mr-2">
                  Question:
                </strong>
                <span className="text-sm">{question.content}</span>
              </div>
              <div className="mt-1">
                <span className="text-xs">
                  {formatIsoDate(question.updatedAt)}
                </span>
              </div>
            </div>
            <Button
              type="submit"
              className="w-5 h-5 p-0 inline-flex items-center rounded-full bg-red-600 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              onClick={async () => {
                setDeleting(true);
                await deleteQuestion(question.id, PATHNAME_HISTORY);
                setDeleting(false);
              }}
            >
              X
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default QuestionItem;
