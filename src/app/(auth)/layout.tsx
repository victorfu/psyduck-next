import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { METADATA_DESCRIPTION, METADATA_TITLE } from "@/lib/constants";
import { cn } from "@/lib/utils";

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
  return (
    <html lang="en" className="h-full">
      <body className={cn("h-full", inter.className)}>
        <main>
          <div className="h-screen">{children}</div>
        </main>
      </body>
    </html>
  );
}
