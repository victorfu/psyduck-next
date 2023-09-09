import Link from "next/link";

export default function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link href="/">Go back</Link>
      </p>
    </div>
  );
}
