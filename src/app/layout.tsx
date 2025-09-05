import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GreenSpark",
  description: "Learn the environment through comics, games & activities",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-b from-emerald-50 to-white text-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {children}
        </div>
      </body>
    </html>
  );
}
