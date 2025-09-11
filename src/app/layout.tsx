import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NextBlock Intelligence - Twitter Reports",
  description: "Daily Twitter Intelligence reports optimized for NextBlock VC's CEO content strategy",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: [
    "twitter",
    "intelligence",
    "reports",
    "nextblock",
    "vc",
    "viral",
    "crypto"
  ],
  authors: [
    {
      name: "NextBlock VC",
    },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#2c0a0b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* NextBlock VC Brand Font */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap" 
          rel="stylesheet"
        />
      </head>
      <body
        className="font-sans antialiased bg-[#2c0a0b] text-white"
        style={{ fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
