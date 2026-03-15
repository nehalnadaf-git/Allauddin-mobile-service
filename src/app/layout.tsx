import type { Metadata } from "next";
import { Bricolage_Grotesque, Poppins, DM_Sans } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

import { CartProvider } from "@/lib/cart";
import { RepairModalProvider } from "@/lib/hooks/useRepairModal";
import { ToastContainer } from "@/components/ui/Toast";
import LayoutShell from "@/components/LayoutShell";
import RepairBookingModal from "@/components/RepairBookingModal";
import { ConvexClientProvider } from "@/lib/providers/ConvexClientProvider";

// Force all pages to render dynamically — required because every page uses
// Convex useQuery which needs a live client and cannot run during SSG.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Allauddin Mobile Service | Phone Repair & Accessories in Hubli, Karnataka",
  description:
    "Expert mobile phone repair in Hubli — screen replacement, battery, water damage & more. Visit Allauddin Mobile Service at Harsha Complex. Open 10AM–8PM daily.",
  keywords: [
    "mobile repair Hubli",
    "mobile service near me",
    "phone repair Hubli Karnataka",
    "screen replacement Hubli",
    "battery replacement Hubli",
    "mobile accessories Hubli",
    "mobile service Harsha Complex",
    "iPhone repair Hubli",
    "Samsung repair Hubli",
    "water damage phone repair Hubli",
  ],
  openGraph: {
    title: "Allauddin Mobile Service | Phone Repair & Accessories in Hubli",
    description:
      "Expert mobile phone repair in Hubli — screen replacement, battery, water damage & more. Visit us at Harsha Complex, Hubli.",
    type: "website",
    locale: "en_IN",
    siteName: "Allauddin Mobile Service",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://aladdinmobileservice.in",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${poppins.variable} ${bricolage.variable}`}>
      <body className="font-dm">
        <ConvexClientProvider>
          <CartProvider>
            <RepairModalProvider>
              <ToastContainer />
              <RepairBookingModal />
              <LayoutShell>{children}</LayoutShell>
            </RepairModalProvider>
          </CartProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
