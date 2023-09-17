import "server-only";
import { getQuestions } from "@/lib/actions";
import { getUserFromHeader } from "@/lib/session-utils";
import QuestionList from "@/components/question-list";

async function HistoryPage() {
  const user = getUserFromHeader();
  const { questions } = await getQuestions(user?.uid);

  return <QuestionList questions={questions as Question[]} />;
}

export default HistoryPage;
