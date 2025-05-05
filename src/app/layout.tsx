import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Trello AI",
  description: "Created by Gabriel Pinheiro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
