import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ahmed Selmi | AI & Full Stack Engineer",
  description: "AI & Full Stack Engineer. Building intelligent software with modern web technologies, AI, and elegant design.",
  keywords: ["Ahmed Selmi", "Full Stack Developer", "AI Engineer", "React", "Spring Boot", "Flutter", "Portfolio"],
  authors: [{ name: "Ahmed Selmi" }],
  openGraph: {
    title: "Ahmed Selmi | AI & Full Stack Engineer",
    description: "AI & Full Stack Engineer. Building intelligent software.",
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
