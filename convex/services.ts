import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const listVisible = query({
    handler: async (ctx) => {
        const all = await ctx.db.query("services").collect();
        return all
            .filter((s) => s.isVisible)
            .sort((a, b) => a.displayOrder - b.displayOrder);
    },
});

// Alias for public components
export const list = listVisible;


export const listAll = query({
    handler: async (ctx) => {
        const all = await ctx.db.query("services").collect();
        return all.sort((a, b) => a.displayOrder - b.displayOrder);
    },
});

export const get = query({
    args: { id: v.id("services") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
    },
});

export const create = mutation({
    args: {
        name: v.string(),
        description: v.string(),
        startingPrice: v.number(),
        iconName: v.string(),
        displayOrder: v.number(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("services", {
            ...args,
            isVisible: true,
            createdAt: Date.now(),
        });
    },
});

export const update = mutation({
    args: {
        id: v.id("services"),
        name: v.optional(v.string()),
        description: v.optional(v.string()),
        startingPrice: v.optional(v.number()),
        iconName: v.optional(v.string()),
        isVisible: v.optional(v.boolean()),
        displayOrder: v.optional(v.number()),
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

export const remove = mutation({
    args: { id: v.id("services") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});

export const toggleVisibility = mutation({
    args: { id: v.id("services") },
    handler: async (ctx, args) => {
        const service = await ctx.db.get(args.id);
        if (!service) throw new Error("Service not found");
        await ctx.db.patch(args.id, { isVisible: !service.isVisible });
    },
});

export const reorder = mutation({
    args: { orderedIds: v.array(v.id("services")) },
    handler: async (ctx, args) => {
        for (let i = 0; i < args.orderedIds.length; i++) {
            await ctx.db.patch(args.orderedIds[i], { displayOrder: i });
        }
    },
});
