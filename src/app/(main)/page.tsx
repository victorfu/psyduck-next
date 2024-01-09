import "server-only";
import dynamic from "next/dynamic";

const HospGrid = dynamic(() => import("@/components/hosp-grid"));

export default function Home() {
  return <HospGrid />;
}
