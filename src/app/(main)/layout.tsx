import "@/app/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Content from "@/components/content";
import { METADATA_DESCRIPTION, METADATA_TITLE } from "@/lib/constants";
import { getUserFromHeader } from "@/lib/session-utils";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Content user={user}>{children}</Content>
          <Toaster />
          <TailwindIndicator />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
