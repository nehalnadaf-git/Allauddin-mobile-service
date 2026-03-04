import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import { RepairModalProvider } from "@/lib/hooks/useRepairModal";
import { ToastContainer } from "@/components/ui/Toast";
import LayoutShell from "@/components/LayoutShell";
import RepairBookingModal from "@/components/RepairBookingModal";
import { ConvexClientProvider } from "@/lib/providers/ConvexClientProvider";

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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=Poppins:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;1,9..40,400&display=swap"
          rel="stylesheet"
        />
      </head>
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
