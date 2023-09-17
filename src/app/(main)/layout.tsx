import "@/app/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LayoutWrapper from "@/components/layout-wrapper";
import { METADATA_DESCRIPTION, METADATA_TITLE } from "@/lib/constants";
import { getUserFromHeader } from "@/lib/session-utils";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";

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
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className={cn("h-full", inter.className)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LayoutWrapper user={user}>{children}</LayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
