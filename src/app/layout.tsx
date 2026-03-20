import type { Metadata } from "next";
import "./globals.css";
import NavigationWrapper from "@/components/NavigationWrapper";

export const metadata: Metadata = {
  title: "Zionsberg | Healing Space",
  description: "A premium multi-purpose healing space in nature.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col font-sans">
        <NavigationWrapper />
        <main className="flex-1 w-full bg-background">
          {children}
        </main>
      </body>
    </html>
  );
}
