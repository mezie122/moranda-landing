import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Moranda Group | Building Value. Creating Opportunities.",
  description: "Moranda Group: media, publishing, film and digital products.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}