import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

import { ThemeProvider } from "@/components/theme-provider";
import { SettingsInitializer } from "@/components/settings-initializer";

export const metadata: Metadata = {
  title: "Jafri Blog — Modern Stories & Insights",
  description: "A premium blog for developers, designers, and tech enthusiasts. Discover the art of modern code.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <SettingsInitializer />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
