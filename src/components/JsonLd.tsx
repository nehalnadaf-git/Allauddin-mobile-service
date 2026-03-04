"use client";

import { useQuery } from "@/lib/mockBackend";
import { api } from "@/lib/mockBackend";

export default function JsonLd() {
    const settings = useQuery(api.settings.get);

    const schema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": "https://aladdinmobileservice.in/#business",
        name: settings?.shopName || "Allauddin Mobile Service",
        alternateName: "Allauddin Mobile Repairs Hubli",
        image: "https://aladdinmobileservice.in/og-image.png",
        url: "https://aladdinmobileservice.in",
        telephone: `+${settings?.whatsappNumber || "916363278962"}`,
        address: {
            "@type": "PostalAddress",
            streetAddress: settings?.address || "Harsha Complex",
            addressLocality: "Hubli",
            addressRegion: "Karnataka",
            postalCode: "580020",
            addressCountry: "IN",
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: 15.3647,
            longitude: 75.1239,
        },
        openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            opens: settings?.workingHoursStart || "10:00",
            closes: settings?.workingHoursEnd || "20:00",
        },
        description:
            "Expert mobile phone repair in Hubli — screen replacement, battery, water damage & more. Visit Allauddin Mobile Service at Harsha Complex. Open 10AM–8PM daily.",
        priceRange: "₹150 - ₹5000",
        currenciesAccepted: "INR",
        paymentAccepted: "Cash, UPI",
        areaServed: {
            "@type": "City",
            name: "Hubli",
        },
        hasMap: "https://google.com/maps?q=Harsha+Complex+Hubli+Karnataka",
        sameAs: [
            "https://wa.me/916363278962",
        ],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
