import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "@/components/ui/sonner";

const mulish = Mulish({
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: "Finance AI Control",
  description: "Plataforma de gestão financeira com IA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <ClerkProvider
        appearance={{
          baseTheme: dark,
        }}
      >
        <body className={`${mulish.className} antialiased`}>
          <div className="flex max-h-[calc(100vh-2rem)] w-full flex-col md:overflow-hidden">
            {children}
            <Toaster position="top-right" richColors duration={2000} />
          </div>
        </body>
      </ClerkProvider>
    </html>
  );
}
