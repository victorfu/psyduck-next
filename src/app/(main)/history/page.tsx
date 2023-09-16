import "server-only";
import { getQuestions } from "@/lib/actions";
import { getUserFromHeader } from "@/lib/session-utils";
import QuestionItem from "@/components/ui/question-item";

export const preload = (uid: string) => {
  void getQuestions(uid);
};
async function HistoryPage() {
  const user = getUserFromHeader();
  const { questions } = await getQuestions(user?.uid);

  return (
    <div className="container">
      <QuestionItem questions={questions as Question[]} />
    </div>
  );
}

export default HistoryPage;
