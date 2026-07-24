import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ahmed Selmi | Full Stack Developer & AI Engineer",
  description: "Full Stack Developer & AI Engineer. Building intelligent software with modern web technologies, AI, and elegant design.",
  keywords: ["Ahmed Selmi", "Full Stack Developer", "AI Engineer", "React", "Spring Boot", "Flutter"],
  authors: [{ name: "Ahmed Selmi" }],
  openGraph: {
    title: "Ahmed Selmi | Full Stack Developer & AI Engineer",
    description: "Building intelligent software with modern web technologies, AI, and elegant design.",
    type: "website",
  },
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
