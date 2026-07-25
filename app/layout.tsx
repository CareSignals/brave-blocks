import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://caresignals.github.io/"),
  title: "Brave Blocks | WRAP Team Review",
  description: "A de-identified professional preview of a playful emotional-learning game for an early reader.",
  manifest: "/brave-blocks/manifest.webmanifest",
  applicationName: "Brave Blocks",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true
    }
  },
  appleWebApp: { capable: true, title: "Brave Blocks", statusBarStyle: "black-translucent" },
  icons: {
    icon: [{ url: "/brave-blocks/favicon.svg", type: "image/svg+xml" }, { url: "/brave-blocks/icon-192.png", sizes: "192x192", type: "image/png" }],
    apple: [{ url: "/brave-blocks/icon-192.png", sizes: "192x192", type: "image/png" }],
    shortcut: "/brave-blocks/favicon.svg"
  },
  openGraph: {
    title: "Brave Blocks | WRAP Team Review",
    description: "De-identified professional preview: big feelings, brave words, and playful quests.",
    type: "website",
    images: [{ url: "/brave-blocks/og.png", width: 1672, height: 941, alt: "Brave Blocks game characters on a floating island" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Brave Blocks | WRAP Team Review",
    description: "De-identified professional preview: big feelings, brave words, and playful quests.",
    images: ["/brave-blocks/og.png"]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
