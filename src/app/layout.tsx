import { GlobalProvider } from "@/components/GlobalContext";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LayoutWrapper from "@/components/LayoutWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Psyduck-next",
  description:
    "Psyduck-next is a web application based on Next.js, TypeScript, and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </GlobalProvider>
      </body>
    </html>
  );
}
