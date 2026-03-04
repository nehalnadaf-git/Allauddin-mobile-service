import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getByType = query({
    args: { type: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("banners")
            .withIndex("by_type", (q) => q.eq("type", args.type as any))
            .first();
    },
});

export const listAll = query({
    handler: async (ctx) => {
        return await ctx.db.query("banners").collect();
    },
});

// Convenience aliases for public components
export const getAll = listAll;

export const getTicker = query({
    handler: async (ctx) => {
        return await ctx.db.query("banners").withIndex("by_type", (q) => q.eq("type", "ticker" as any)).first();
    },
});
export const getPromoLanding = query({
    handler: async (ctx) => {
        return await ctx.db.query("banners").withIndex("by_type", (q) => q.eq("type", "promo_landing" as any)).first();
    },
});
export const getServiceHighlight = query({
    handler: async (ctx) => {
        return await ctx.db.query("banners").withIndex("by_type", (q) => q.eq("type", "service_highlight" as any)).first();
    },
});
export const getPromoAccessories = query({
    handler: async (ctx) => {
        return await ctx.db.query("banners").withIndex("by_type", (q) => q.eq("type", "promo_accessories" as any)).first();
    },
});


export const update = mutation({
    args: {
        type: v.string(),
        headingText: v.optional(v.string()),
        subText: v.optional(v.string()),
        ctaLabel: v.optional(v.string()),
        ctaLink: v.optional(v.string()),
        colorTheme: v.optional(v.union(v.literal("blue"), v.literal("gold"), v.literal("red"))),
    },
    handler: async (ctx, args) => {
        const { type, ...fields } = args;
        const existing = await ctx.db
            .query("banners")
            .withIndex("by_type", (q) => q.eq("type", type as any))
            .first();
        if (!existing) throw new Error("Banner not found");
        const updates: Record<string, unknown> = { updatedAt: Date.now() };
        for (const [key, value] of Object.entries(fields)) {
            if (value !== undefined) updates[key] = value;
        }
        await ctx.db.patch(existing._id, updates);
    },
});

export const toggleVisibility = mutation({
    args: { type: v.string(), isVisible: v.boolean() },
    handler: async (ctx, args) => {
        const existing = await ctx.db
            .query("banners")
            .withIndex("by_type", (q) => q.eq("type", args.type as any))
            .first();
        if (!existing) throw new Error("Banner not found");
        await ctx.db.patch(existing._id, { isVisible: args.isVisible, updatedAt: Date.now() });
    },
});

export const seed = mutation({
    handler: async (ctx) => {
        type BannerType = "ticker" | "promo_landing" | "service_highlight" | "promo_accessories";
        const bannerDefs: Array<{ type: BannerType; headingText: string; subText?: string; ctaLabel?: string; ctaLink?: string; colorTheme?: "blue" | "gold" | "red" }> = [
            { type: "ticker", headingText: "🔧 Fast repairs · 90-day warranty · Walk-ins welcome · Hubli's trusted mobile repair shop" },
            { type: "promo_landing", headingText: "Get ₹100 Off Your First Repair!", subText: "Show this banner at the shop. Valid till end of month.", ctaLabel: "Book a Repair", ctaLink: "#repair" },
            { type: "service_highlight", headingText: "Same-Day Screen Replacement", subText: "Most repairs done in under 60 minutes.", ctaLabel: "View Services" },
            { type: "promo_accessories", headingText: "Buy 2 Accessories, Get 10% Off!", subText: "Mix & match from any category.", colorTheme: "blue" },
        ];
        for (const banner of bannerDefs) {
            const existing = await ctx.db.query("banners").withIndex("by_type", (q) => q.eq("type", banner.type)).first();
            if (!existing) {
                await ctx.db.insert("banners", { ...banner, isVisible: true });
            }
        }
    },
});
