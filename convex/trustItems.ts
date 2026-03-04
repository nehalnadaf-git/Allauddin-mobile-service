import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const listAll = query({
    handler: async (ctx) => {
        const items = await ctx.db.query("trustItems").collect();
        return items.sort((a, b) => a.displayOrder - b.displayOrder);
    },
});

export const listVisible = query({
    handler: async (ctx) => {
        const items = await ctx.db.query("trustItems").collect();
        return items.filter((i) => i.isVisible).sort((a, b) => a.displayOrder - b.displayOrder);
    },
});

// Alias for public components
export const list = listVisible;


export const update = mutation({
    args: {
        id: v.id("trustItems"),
        iconName: v.optional(v.string()),
        label: v.optional(v.string()),
        description: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const { id, ...fields } = args;
        const updates: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(fields)) {
            if (value !== undefined) updates[key] = value;
        }
        await ctx.db.patch(id, updates);
    },
});

export const toggleVisibility = mutation({
    args: { id: v.id("trustItems"), isVisible: v.boolean() },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, { isVisible: args.isVisible });
    },
});

export const reorder = mutation({
    args: { orders: v.array(v.object({ id: v.id("trustItems"), order: v.number() })) },
    handler: async (ctx, args) => {
        for (const { id, order } of args.orders) {
            await ctx.db.patch(id, { displayOrder: order });
        }
    },
});


export const seed = mutation({
    handler: async (ctx) => {
        const existing = await ctx.db.query("trustItems").first();
        if (existing) return;
        const items = [
            { iconName: "Wrench", label: "Expert Repairs", description: "10+ years of experience", displayOrder: 0 },
            { iconName: "Zap", label: "Fast Turnaround", description: "Most repairs in under 60 min", displayOrder: 1 },
            { iconName: "Shield", label: "90-Day Warranty", description: "On all parts & labour", displayOrder: 2 },
            { iconName: "Star", label: "500+ Happy Customers", description: "Trusted in Hubli since 2014", displayOrder: 3 },
        ];
        for (const item of items) {
            await ctx.db.insert("trustItems", { ...item, isVisible: true });
        }
    },
});
