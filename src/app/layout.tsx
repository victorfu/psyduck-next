import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LayoutWrapper from "@/components/LayoutWrapper";
import { classNames } from "@/utils";
import { getUserFromHeader } from "@/utils/session-utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Psyduck-next",
  description:
    "Psyduck-next is a Next.js 13 boilerplate with firebase authentication and firestore, based on React, TypeScript, and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = getUserFromHeader();
  return (
    <html lang="en" className="h-full">
      <body className={classNames("h-full", inter.className)}>
        <LayoutWrapper user={user}>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
