import "server-only";
import { getQuestions } from "@/lib/actions";
import { getUserFromHeader } from "@/lib/session-utils";
import QuestionItem from "@/components/question-item";

async function HistoryPage() {
  const user = getUserFromHeader();
  const { questions } = await getQuestions(user?.uid);

  return <QuestionItem questions={questions as Question[]} />;
}

export default HistoryPage;
