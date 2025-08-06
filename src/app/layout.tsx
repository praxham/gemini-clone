import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/store/StoreProvider";

export const metadata: Metadata = {
  title: "Google Gemini",
  description: "Gemini Clone",
  viewport: "width=device-width, initial-scale=1.0",
  icons: {
    icon: "/assets/navbar/gemini-color.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className="antialiased">{children}</body>
      </html>
    </StoreProvider>
  );
}
