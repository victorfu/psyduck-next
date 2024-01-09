import "server-only";
import dynamic from "next/dynamic";

const Landing = dynamic(() => import("@/components/landing"));

export default function Home() {
  return <Landing />;
}
