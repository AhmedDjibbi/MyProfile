import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ahmed Selmi | Full Stack Developer",
  description: "Junior Full Stack Developer & Computer Science Student. Experienced in React, Spring Boot, Flutter, and modern web development.",
  keywords: ["Ahmed Selmi", "Full Stack Developer", "React", "Spring Boot", "Flutter", "Web Developer", "Portfolio"],
  authors: [{ name: "Ahmed Selmi" }],
  openGraph: {
    title: "Ahmed Selmi | Full Stack Developer",
    description: "Junior Full Stack Developer & Computer Science Student",
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
