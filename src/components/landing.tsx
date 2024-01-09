import Link from "next/link";
import { Button } from "./ui/button";

export default function Landing() {
  return (
    <div className="flex items-center flex-col">
      <div>Psyduck Next</div>
      <Button variant="link">
        <Link href="/login">Go to login</Link>
      </Button>
    </div>
  );
}
