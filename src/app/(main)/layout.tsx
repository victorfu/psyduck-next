import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LayoutWrapper from "@/components/LayoutWrapper";
import { METADATA_DESCRIPTION, METADATA_TITLE, classNames } from "@/utils";
import { getUserFromHeader } from "@/utils/session-utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: METADATA_TITLE,
  description: METADATA_DESCRIPTION,
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
