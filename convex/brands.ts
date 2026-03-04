import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const listAll = query({
    handler: async (ctx) => {
        const brands = await ctx.db.query("brands").collect();
        return brands.sort((a, b) => a.displayOrder - b.displayOrder);
    },
});

export const listVisible = query({
    handler: async (ctx) => {
        const brands = await ctx.db.query("brands").collect();
        return brands.filter((b) => b.isVisible).sort((a, b) => a.displayOrder - b.displayOrder);
    },
});

// Alias for public components
export const list = listVisible;


export const create = mutation({
    args: { name: v.string() },
    handler: async (ctx, args) => {
        const all = await ctx.db.query("brands").collect();
        return await ctx.db.insert("brands", {
            name: args.name,
            isVisible: true,
            displayOrder: all.length,
            createdAt: Date.now(),
        });
    },
});

export const remove = mutation({
    args: { id: v.id("brands") },
    handler: async (ctx, args) => {
        const brand = await ctx.db.get(args.id);
        if (brand?.logoStorageId) {
            await ctx.storage.delete(brand.logoStorageId);
        }
        await ctx.db.delete(args.id);
    },
});

export const toggleVisibility = mutation({
    args: { id: v.id("brands"), isVisible: v.boolean() },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, { isVisible: args.isVisible });
    },
});

export const update = mutation({
    args: {
        id: v.id("brands"),
        name: v.optional(v.string()),
        displayOrder: v.optional(v.number()),
        logoStorageId: v.optional(v.id("_storage")),
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

export const reorder = mutation({
    args: { orders: v.array(v.object({ id: v.id("brands"), order: v.number() })) },
    handler: async (ctx, args) => {
        for (const { id, order } of args.orders) {
            await ctx.db.patch(id, { displayOrder: order });
        }
    },
});

