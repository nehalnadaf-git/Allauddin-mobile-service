export const initialMockData = {
    settings: {
        shopName: "Allauddin Mobile Service",
        tagline: "Your Phone, Perfectly Restored",
        whatsappNumber: "916363278962",
        upiId: "nehalnadaf@ptyes",
        workingHoursStart: "10:00",
        workingHoursEnd: "20:00",
        address: "Harsha Complex, Hubli, Karnataka",
        googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3847.935!2d75.1239!3d15.3647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zSMO7YmxpLCBLYXJuYXRha2E!5e0!3m2!1sen!2sin!4v1234567890",
        inStoreNoticeText: "In-store collection only — no home delivery. Visit us at Harsha Complex, Hubli.",
        inStoreNoticeVisible: true,
        cashOrderMessageTemplate: "Hi Allauddin! I'd like to order the following accessories:\n\n{order_items}\n\nTotal Amount: ₹{total_amount}\nPayment: Cash on Pickup\n\nI will collect from your shop. Please confirm.",
        upiOrderMessageTemplate: "Hi Allauddin! I'd like to order the following accessories:\n\n{order_items}\n\nTotal Amount: ₹{total_amount}\nPayment: UPI\n\nI will collect from your shop. Please confirm.",
        socialLinks: [
            { platform: "WhatsApp", url: "https://wa.me/916363278962", isVisible: true, displayOrder: 0 },
            { platform: "Instagram", url: "https://instagram.com/aladdinmobile", isVisible: true, displayOrder: 1 },
            { platform: "Facebook", url: "https://facebook.com/aladdinmobile", isVisible: true, displayOrder: 2 },
        ],
    },

    banners: [
        {
            _id: "banner_ticker",
            type: "ticker",
            headingText: "Welcome to Allauddin Mobile Service — Expert Phone Repair in Hubli ◆ Open 10AM–8PM Daily ◆ All Brands Repaired ◆ Same Day Service Available",
            isVisible: true,
        },
        {
            _id: "banner_promo_landing",
            type: "promo_landing",
            headingText: "🎉 Special Offer — 20% Off All Screen Replacements This Month!",
            subText: "Walk in or book via WhatsApp. Genuine parts guaranteed.",
            ctaLabel: "Shop Accessories Now",
            ctaLink: "/accessories",
            isVisible: true,
        },
        {
            _id: "banner_service_highlight",
            type: "service_highlight",
            headingText: "⭐ Most Popular: Screen Replacement",
            subText: "From ₹500 — Fast turnaround with original quality parts",
            ctaLabel: "Book This Repair",
            isVisible: true,
        },
        {
            _id: "banner_promo_accessories",
            type: "promo_accessories",
            headingText: "🔥 Hot Deals on Mobile Accessories!",
            subText: "Screen protectors, cases, chargers & more — all in-store",
            colorTheme: "blue",
            isVisible: true,
        },
    ],

    brands: [
        { _id: "brand1", name: "Samsung", isVisible: true, displayOrder: 0 },
        { _id: "brand2", name: "Apple", isVisible: true, displayOrder: 1 },
        { _id: "brand3", name: "OnePlus", isVisible: true, displayOrder: 2 },
        { _id: "brand4", name: "Vivo", isVisible: true, displayOrder: 3 },
        { _id: "brand5", name: "Oppo", isVisible: true, displayOrder: 4 },
        { _id: "brand6", name: "Realme", isVisible: true, displayOrder: 5 },
        { _id: "brand7", name: "Redmi", isVisible: true, displayOrder: 6 },
        { _id: "brand8", name: "Motorola", isVisible: true, displayOrder: 7 },
        { _id: "brand9", name: "Nokia", isVisible: true, displayOrder: 8 },
        { _id: "brand10", name: "MI", isVisible: true, displayOrder: 9 },
    ],

    trustItems: [
        { _id: "trust1", iconName: "Wrench", label: "Expert Technicians", description: "Trained professionals for all brands", isVisible: true, displayOrder: 0 },
        { _id: "trust2", iconName: "Zap", label: "Same Day Repair", description: "Most repairs done within hours", isVisible: true, displayOrder: 1 },
        { _id: "trust3", iconName: "CheckCircle", label: "Genuine Parts", description: "Original quality parts only", isVisible: true, displayOrder: 2 },
        { _id: "trust4", iconName: "Shield", label: "Warranty on Repairs", description: "Every repair backed by warranty", isVisible: true, displayOrder: 3 },
    ],

    howItWorksSteps: [
        { _id: "hiw1", stepNumber: 1, iconName: "MapPin", title: "Bring Your Phone", description: "Walk in or book via WhatsApp — open 10AM–8PM every day" },
        { _id: "hiw2", stepNumber: 2, iconName: "Wrench", title: "We Diagnose & Repair", description: "Our expert checks and repairs with genuine parts" },
        { _id: "hiw3", stepNumber: 3, iconName: "CheckCircle", title: "Collect Your Phone", description: "Pick up your restored phone — same day for most repairs" },
    ],

    categories: [
        { _id: "cat1", name: "iPhone Accessories", slug: "iphone", isVisible: true, displayOrder: 0 },
        { _id: "cat2", name: "Samsung", slug: "samsung", isVisible: true, displayOrder: 1 },
        { _id: "cat3", name: "General", slug: "general", isVisible: true, displayOrder: 2 },
        { _id: "cat4", name: "Chargers & Cables", slug: "chargers-cables", isVisible: true, displayOrder: 3 },
        { _id: "cat5", name: "Earphones & Audio", slug: "audio", isVisible: true, displayOrder: 4 },
        { _id: "cat6", name: "Screen Protectors", slug: "screen-protectors", isVisible: true, displayOrder: 5 },
        { _id: "cat7", name: "Offers & Deals", slug: "offers", isVisible: true, displayOrder: 6 },
    ],

    products: [
        { _id: "prod1", name: "Tempered Glass Screen Protector", slug: "tempered-glass", categoryId: "cat6", price: 199, priceRange: "₹99 – ₹199", isVisible: true, isInStock: true, displayOrder: 0, createdAt: Date.now(), offerType: "none", description: "9H hardness, crystal clear protection for all phone models" },
        { _id: "prod2", name: "Silicone Back Cover (Universal)", slug: "silicone-cover", categoryId: "cat3", price: 199, priceRange: "₹99 – ₹299", isVisible: true, isInStock: true, displayOrder: 1, createdAt: Date.now(), offerType: "discount", discountPercentage: 20, discountedPrice: 159, description: "Soft, flexible silicone case with raised edges for screen protection" },
        { _id: "prod3", name: "Type-C Fast Charging Cable (1m)", slug: "typec-cable", categoryId: "cat4", price: 299, priceRange: "₹149 – ₹299", isVisible: true, isInStock: true, displayOrder: 2, createdAt: Date.now(), offerType: "none", description: "Braided Type-C cable, supports fast charging up to 65W" },
        { _id: "prod4", name: "20W Fast Charger Adapter", slug: "20w-charger", categoryId: "cat4", price: 499, priceRange: "₹299 – ₹499", isVisible: true, isInStock: true, displayOrder: 3, createdAt: Date.now(), offerType: "none", description: "Compact 20W fast charger adapter, universal compatibility" },
        { _id: "prod5", name: "iPhone Lightning Cable (1m)", slug: "lightning-cable", categoryId: "cat1", price: 299, priceRange: "₹199 – ₹399", isVisible: true, isInStock: true, displayOrder: 4, createdAt: Date.now(), offerType: "bogo", description: "High-quality Lightning cable, MFi compatible for iPhone/iPad" },
        { _id: "prod6", name: "Wired Earphones with Mic", slug: "wired-earphones", categoryId: "cat5", price: 249, priceRange: "₹149 – ₹349", isVisible: true, isInStock: true, displayOrder: 5, createdAt: Date.now(), offerType: "none", description: "Clear audio with built-in mic — works with all devices" },
        { _id: "prod7", name: "Power Bank 10000mAh", slug: "power-bank", categoryId: "cat3", price: 999, priceRange: "₹799 – ₹1299", isVisible: true, isInStock: true, displayOrder: 6, createdAt: Date.now(), offerType: "none", description: "Dual output 10000mAh power bank with fast charging support" },
        { _id: "prod8", name: "Samsung A-Series Back Cover", slug: "samsung-a-cover", categoryId: "cat2", price: 299, priceRange: "₹149 – ₹399", isVisible: true, isInStock: true, displayOrder: 7, createdAt: Date.now(), offerType: "discount", discountPercentage: 15, discountedPrice: 254, description: "Protective back cover designed for Samsung A-series phones" },
        { _id: "prod9", name: "OTG Adapter (Type-C to USB)", slug: "otg-adapter", categoryId: "cat3", price: 149, priceRange: "₹99 – ₹199", isVisible: true, isInStock: true, displayOrder: 8, createdAt: Date.now(), offerType: "none", description: "Compact OTG adapter, plug-and-play for all Type-C devices" },
        { _id: "prod10", name: "Anti-Radiation Flip Cover", slug: "flip-cover", categoryId: "cat3", price: 349, priceRange: "₹199 – ₹499", isVisible: true, isInStock: false, displayOrder: 9, createdAt: Date.now(), offerType: "none", description: "Premium flip cover with anti-radiation shield and card slots" },
    ],

    services: [
        { _id: "svc1", name: "Screen Replacement", description: "Cracked display replaced with original quality screen", iconName: "Smartphone", startingPrice: 500, isVisible: true, displayOrder: 0, createdAt: Date.now() },
        { _id: "svc2", name: "Battery Replacement", description: "Genuine battery replacement for full battery life", iconName: "BatteryFull", startingPrice: 300, isVisible: true, displayOrder: 1, createdAt: Date.now() },
        { _id: "svc3", name: "Charging Port Repair", description: "Fix slow/no-charging — port cleaning or replacement", iconName: "Plug", startingPrice: 200, isVisible: true, displayOrder: 2, createdAt: Date.now() },
        { _id: "svc4", name: "Speaker & Mic Repair", description: "Restore audio quality — earpiece, loudspeaker, or mic", iconName: "Volume2", startingPrice: 250, isVisible: true, displayOrder: 3, createdAt: Date.now() },
        { _id: "svc5", name: "Software & Flashing", description: "OS reinstall, hang/boot issues, virus removal, reset", iconName: "RotateCcw", startingPrice: 200, isVisible: true, displayOrder: 4, createdAt: Date.now() },
        { _id: "svc6", name: "Water Damage Repair", description: "Deep cleaning and component repair for water-damaged phones", iconName: "Droplets", startingPrice: 400, isVisible: true, displayOrder: 5, createdAt: Date.now() },
        { _id: "svc7", name: "Camera Repair", description: "Fix blurry or non-functional front/rear cameras", iconName: "Camera", startingPrice: 350, isVisible: true, displayOrder: 6, createdAt: Date.now() },
        { _id: "svc8", name: "Back Panel Replacement", description: "Replace broken or scratched back glass or plastic", iconName: "RectangleHorizontal", startingPrice: 300, isVisible: true, displayOrder: 7, createdAt: Date.now() },
        { _id: "svc9", name: "Button Repair", description: "Fix non-responsive home, volume, or power buttons", iconName: "CircleDot", startingPrice: 150, isVisible: true, displayOrder: 8, createdAt: Date.now() },
        { _id: "svc10", name: "Data Recovery", description: "Recover lost contacts, photos, and files", iconName: "HardDrive", startingPrice: 500, isVisible: true, displayOrder: 9, createdAt: Date.now() },
        { _id: "svc11", name: "Network / SIM Issues", description: "Fix no signal, SIM not detected, network problems", iconName: "Signal", startingPrice: 200, isVisible: true, displayOrder: 10, createdAt: Date.now() },
        { _id: "svc12", name: "Motherboard Repair", description: "Component-level motherboard diagnosis and repair", iconName: "Cpu", startingPrice: 800, isVisible: true, displayOrder: 11, createdAt: Date.now() },
    ],

    portfolio: [
        { _id: "port1", title: "Screen Replacement", description: "Shattered Samsung Galaxy screen replaced with original AMOLED. Crystal clear, touch-perfect.", isVisible: true, displayOrder: 0, imageUrlBefore: "/portfolio/iphone_screen_before.png", imageUrlAfter: "/portfolio/iphone_screen_after.png", createdAt: Date.now() },
        { _id: "port2", title: "Battery Replacement", description: "iPhone draining in 2 hours — genuine battery replacement. Now lasts a full day.", isVisible: true, displayOrder: 1, imageUrlBefore: "/portfolio/samsung_back_before.png", imageUrlAfter: "/portfolio/samsung_back_after.png", createdAt: Date.now() },
        { _id: "port3", title: "Water Damage Recovery", description: "Dropped in water, not turning on — fully cleaned and restored to perfect condition.", isVisible: true, displayOrder: 2, imageUrlBefore: "/portfolio/iphone_water_before.png", imageUrlAfter: "/portfolio/iphone_water_after.png", createdAt: Date.now() },
        { _id: "port4", title: "Back Panel Replacement", description: "Broken OnePlus back glass — brand-new smooth finish panel. Looks factory new.", isVisible: true, displayOrder: 3, imageUrlBefore: "/portfolio/oneplus_board_before.png", imageUrlAfter: "/portfolio/oneplus_board_after.png", createdAt: Date.now() },
        { _id: "port5", title: "Charging Port Repair", description: "Port clogged and damaged — cleaned and replaced, charges perfectly.", isVisible: true, displayOrder: 4, imageUrlBefore: "/portfolio/iphone_screen_before.png", imageUrlAfter: "/portfolio/iphone_screen_after.png", createdAt: Date.now() },
    ],

    reviews: [
        { _id: "rev1", customerName: "Rahul Desai", starRating: 5, reviewText: "Amazing service! My iPhone screen was completely shattered. They fixed it in 30 minutes and it looks brand new. Highly recommended in Hubli.", status: "approved", submittedAt: Date.now() - 86400000 * 2, createdAt: Date.now() - 86400000 * 2 },
        { _id: "rev2", customerName: "Priya Shetty", starRating: 5, reviewText: "Very professional and quick. My S21 battery was dying in 2 hours. After replacement, it lasts a full day easily.", status: "approved", submittedAt: Date.now() - 86400000 * 5, createdAt: Date.now() - 86400000 * 5 },
        { _id: "rev3", customerName: "Imran Khan", starRating: 4, reviewText: "Other shops said my phone was dead. Allauddin Mobile revived it by fixing the motherboard. Saved all my data. Great expertise.", status: "approved", submittedAt: Date.now() - 86400000 * 10, createdAt: Date.now() - 86400000 * 10 },
        { _id: "rev4", customerName: "Sneha Patil", starRating: 5, reviewText: "Dropped phone in water and thought it was gone. They cleaned it and it works perfectly. Unbelievable service!", status: "pending", submittedAt: Date.now() - 86400000 * 1, createdAt: Date.now() - 86400000 * 1 },
        { _id: "rev5", customerName: "Arjun Kulkarni", starRating: 5, reviewText: "Best mobile repair shop in Hubli! Got my OnePlus screen replaced at a very reasonable price. Super fast service.", status: "approved", submittedAt: Date.now() - 86400000 * 15, createdAt: Date.now() - 86400000 * 15 },
    ],

    activityLog: [] as any[],
    adminSessions: [{ _id: "sess1", token: "mock-admin-token", createdAt: Date.now(), lastActive: Date.now(), isValid: true }]
};
