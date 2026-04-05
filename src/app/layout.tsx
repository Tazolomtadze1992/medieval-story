import type { Metadata } from "next";
import { Geist_Mono, MedievalSharp, UnifrakturMaguntia } from "next/font/google";
import { GeistPixelSquare } from "geist/font/pixel";
import { ThemeProvider } from "@/components/theme/theme-provider";
import "./globals.css";

/** Figma: site title “Garden Archive” */
const fontSiteTitle = MedievalSharp({
  variable: "--font-site-title",
  subsets: ["latin"],
  weight: ["400"],
});

/** Figma: chapter heading (e.g. “Chapter 1”) */
const fontChapter = UnifrakturMaguntia({
  variable: "--font-chapter",
  subsets: ["latin"],
  weight: ["400"],
});

const fontMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Garden Archive",
  description: "An editorial storybook image experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontSiteTitle.variable} ${fontChapter.variable} ${GeistPixelSquare.variable} ${fontMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full font-sans">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
