"use client";

import { formatIsoDate } from "@/lib/utils";
import { useTransition } from "react";
import { Button } from "./ui/button";
import { deleteQuestion } from "@/lib/actions";
import { PATHNAME_HISTORY } from "@/lib/constants";
import LoadingSpinner from "./ui/loading-spinner";

const QuestionList = ({ questions }: { questions: Question[] }) => {
  let [isPending, startTransition] = useTransition();

  return (
    <div className="w-full flex flex-col">
      {isPending && <LoadingSpinner fullpage={true} />}
      {questions?.map((doc) => {
        const question = doc as Question;
        return (
          <div
            className="relative flex items-center border border-gray-300 p-4 rounded-lg bg-gray-100 my-2 shadow-sm"
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
              className="absolute top-2 right-2 w-6 h-6 p-0 inline-flex items-center justify-center bg-red-500 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-500"
              onClick={() => {
                startTransition(async () => {
                  await deleteQuestion(question.id, PATHNAME_HISTORY);
                });
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

export default QuestionList;
