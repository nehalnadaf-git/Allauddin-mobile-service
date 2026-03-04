import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
    handler: async (ctx) => {
        const settings = await ctx.db.query("settings").first();
        return settings;
    },
});

export const update = mutation({
    args: {
        shopName: v.optional(v.string()),
        tagline: v.optional(v.string()),
        whatsappNumber: v.optional(v.string()),
        upiId: v.optional(v.string()),
        workingHoursStart: v.optional(v.string()),
        workingHoursEnd: v.optional(v.string()),
        address: v.optional(v.string()),
        googleMapsEmbedUrl: v.optional(v.string()),
        ownerImageStorageId: v.optional(v.id("_storage")),
        inStoreNoticeText: v.optional(v.string()),
        inStoreNoticeVisible: v.optional(v.boolean()),
    },
    handler: async (ctx, args) => {
        const existing = await ctx.db.query("settings").first();
        if (!existing) throw new Error("Settings not found. Run seed first.");
        const updates: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(args)) {
            if (value !== undefined) updates[key] = value;
        }
        await ctx.db.patch(existing._id, updates);
    },
});

export const updateSocialLinks = mutation({
    args: {
        socialLinks: v.array(
            v.object({
                platform: v.string(),
                url: v.string(),
                isVisible: v.boolean(),
                displayOrder: v.number(),
            })
        ),
    },
    handler: async (ctx, args) => {
        const existing = await ctx.db.query("settings").first();
        if (!existing) throw new Error("Settings not found. Run seed first.");
        await ctx.db.patch(existing._id, { socialLinks: args.socialLinks });
    },
});


