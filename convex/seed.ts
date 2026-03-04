import { mutation } from "./_generated/server";

export const seed = mutation({
    handler: async (ctx) => {
        // Check if already seeded
        const existingSettings = await ctx.db.query("settings").first();
        if (existingSettings) {
            throw new Error("Database already seeded. Delete settings to re-seed.");
        }

        // --- Categories ---
        const categoryData = [
            { name: "iPhone Accessories", description: "Cases, cables, and accessories for iPhone", displayOrder: 0 },
            { name: "Samsung Accessories", description: "Cases, covers, and accessories for Samsung", displayOrder: 1 },
            { name: "General / Universal Accessories", description: "Accessories that work with all devices", displayOrder: 2 },
            { name: "Chargers & Cables", description: "Fast chargers, cables, and adapters", displayOrder: 3 },
            { name: "Earphones & Audio", description: "Wired and wireless earphones", displayOrder: 4 },
            { name: "Screen Protectors", description: "Tempered glass and screen protectors", displayOrder: 5 },
            { name: "Offers & Deals", description: "Special offers and discounted items", displayOrder: 6 },
        ];

        const categoryIds: Record<string, string> = {};
        for (const cat of categoryData) {
            const id = await ctx.db.insert("categories", {
                ...cat,
                isVisible: true,
                createdAt: Date.now(),
            });
            categoryIds[cat.name] = id;
        }

        // --- Products ---
        const productData = [
            { name: "Tempered Glass Screen Protector", category: "Screen Protectors", price: 99, priceRange: "₹99 – ₹199", description: "9H hardness tempered glass for all phone models" },
            { name: "Silicone Back Cover (Universal)", category: "General / Universal Accessories", price: 99, priceRange: "₹99 – ₹299", description: "Soft silicone cover available in multiple colors" },
            { name: "Type-C Fast Charging Cable (1m)", category: "Chargers & Cables", price: 149, priceRange: "₹149 – ₹299", description: "Durable braided Type-C cable with fast charging" },
            { name: "20W Fast Charger Adapter", category: "Chargers & Cables", price: 299, priceRange: "₹299 – ₹499", description: "Quick charge adapter compatible with all devices" },
            { name: "iPhone Lightning Cable (1m)", category: "iPhone Accessories", price: 199, priceRange: "₹199 – ₹399", description: "MFi quality lightning cable for iPhone" },
            { name: "Wired Earphones with Mic", category: "Earphones & Audio", price: 149, priceRange: "₹149 – ₹349", description: "Clear sound quality with inline microphone" },
            { name: "Power Bank 10000mAh", category: "General / Universal Accessories", price: 799, priceRange: "₹799 – ₹1299", description: "Compact portable charger with dual USB output" },
            { name: "Samsung A-Series Back Cover", category: "Samsung Accessories", price: 149, priceRange: "₹149 – ₹399", description: "Premium back cover for Samsung A-series phones" },
            { name: "OTG Adapter (Type-C to USB)", category: "General / Universal Accessories", price: 99, priceRange: "₹99 – ₹199", description: "Connect USB drives directly to your phone" },
            { name: "Anti-Radiation Flip Cover", category: "General / Universal Accessories", price: 199, priceRange: "₹199 – ₹499", description: "Protective flip cover with card slot" },
        ];

        for (let i = 0; i < productData.length; i++) {
            const p = productData[i];
            await ctx.db.insert("products", {
                name: p.name,
                categoryId: categoryIds[p.category] as any,
                price: p.price,
                priceRange: p.priceRange,
                description: p.description,
                isInStock: true,
                isVisible: true,
                displayOrder: i,
                createdAt: Date.now(),
            });
        }

        // --- Portfolio ---
        const portfolioData = [
            { title: "Screen Replacement", description: "Completely shattered Samsung Galaxy screen replaced with original AMOLED display. Crystal clear and touch-perfect.", displayOrder: 0 },
            { title: "Battery Replacement", description: "iPhone battery draining in 2 hours — replaced with genuine battery. Now lasts a full day.", displayOrder: 1 },
            { title: "Water Damage Recovery", description: "Phone dropped in water, not turning on — fully cleaned, dried, and restored to perfect working condition.", displayOrder: 2 },
            { title: "Back Panel Replacement", description: "Broken scratched back glass on OnePlus — replaced with a brand-new smooth finish panel. Looks factory new.", displayOrder: 3 },
            { title: "Charging Port Repair", description: "Phone not charging at all — port was clogged and damaged. Cleaned and replaced, now charges perfectly.", displayOrder: 4 },
        ];

        for (const item of portfolioData) {
            await ctx.db.insert("portfolio", {
                ...item,
                isVisible: true,
                createdAt: Date.now(),
            });
        }

        // --- Services ---
        const servicesData = [
            { name: "Screen Replacement", description: "Cracked display replaced with original quality screen", startingPrice: 500, iconName: "Smartphone" },
            { name: "Battery Replacement", description: "Genuine battery replacement for full battery life", startingPrice: 300, iconName: "BatteryFull" },
            { name: "Charging Port Repair", description: "Fix slow/no-charging — port cleaning or replacement", startingPrice: 200, iconName: "Plug" },
            { name: "Speaker & Mic Repair", description: "Restore audio quality — earpiece, loudspeaker, or mic", startingPrice: 250, iconName: "Volume2" },
            { name: "Software & Flashing", description: "OS reinstall, hang/boot issues, virus removal, reset", startingPrice: 200, iconName: "RotateCcw" },
            { name: "Water Damage Repair", description: "Deep cleaning and component repair for water-damaged phones", startingPrice: 400, iconName: "Droplets" },
            { name: "Camera Repair", description: "Fix blurry or non-functional front/rear cameras", startingPrice: 350, iconName: "Camera" },
            { name: "Back Panel Replacement", description: "Replace broken or scratched back glass or plastic", startingPrice: 300, iconName: "RectangleHorizontal" },
            { name: "Button Repair", description: "Fix non-responsive home, volume, or power buttons", startingPrice: 150, iconName: "CircleDot" },
            { name: "Data Recovery", description: "Recover lost contacts, photos, and files", startingPrice: 500, iconName: "HardDrive" },
            { name: "Network / SIM Issues", description: "Fix no signal, SIM not detected, network problems", startingPrice: 200, iconName: "Signal" },
            { name: "Motherboard Repair", description: "Component-level motherboard diagnosis and repair", startingPrice: 800, iconName: "Cpu" },
        ];

        for (let i = 0; i < servicesData.length; i++) {
            await ctx.db.insert("services", {
                ...servicesData[i],
                isVisible: true,
                displayOrder: i,
                createdAt: Date.now(),
            });
        }

        // --- Settings ---
        await ctx.db.insert("settings", {
            shopName: "Allauddin Mobile Service",
            tagline: "Your Phone, Perfectly Restored",
            whatsappNumber: "+916363278962",
            upiId: "nehalnadaf@ptyes",
            workingHoursStart: "10:00",
            workingHoursEnd: "20:00",
            address: "Harsha Complex, Hubli, Karnataka, India",
            googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3847.8!2d75.12!3d15.35!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sHarsha+Complex+Hubli!5e0!3m2!1sen!2sin!4v1",
            socialLinks: [
                { platform: "WhatsApp", url: "https://wa.me/916363278962", isVisible: true, displayOrder: 0 },
                { platform: "Instagram", url: "https://instagram.com/", isVisible: true, displayOrder: 1 },
                { platform: "Facebook", url: "https://facebook.com/", isVisible: true, displayOrder: 2 },
            ],
            inStoreNoticeText: "In-store collection only — no home delivery",
            inStoreNoticeVisible: true,
        });


        // --- Admin User ---
        // Default admin: username "admin", password "aladdin123"
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let hash = 0;
        const pwd = "aladdin123";
        for (let i = 0; i < pwd.length; i++) {
            const char = pwd.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash |= 0;
        }
        const passwordHash = "h_" + Math.abs(hash).toString(36) + "_" + pwd.length;

        await ctx.db.insert("adminUsers", {
            username: "admin",
            passwordHash,
            failedAttempts: 0,
        });

        return "Database seeded successfully!";
    },
});


