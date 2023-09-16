import "server-only";
import { formatIsoDate } from "@/lib/utils";
import { getQuestions } from "@/lib/actions";
import { getUserFromHeader } from "@/lib/session-utils";
import DeleteQuestionButton from "@/components/ui/delete-button";

async function HistoryPage() {
  const user = getUserFromHeader();
  const { questions } = await getQuestions(user?.uid);

  return (
    <div className="container mx-auto">
      <div className="w-full flex flex-col">
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
              <DeleteQuestionButton id={question.id} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HistoryPage;
