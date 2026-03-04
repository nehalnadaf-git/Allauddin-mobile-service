import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const listVisible = query({
    handler: async (ctx) => {
        const all = await ctx.db.query("portfolio").collect();
        return all
            .filter((p) => p.isVisible)
            .sort((a, b) => a.displayOrder - b.displayOrder);
    },
});

export const listAll = query({
    handler: async (ctx) => {
        const all = await ctx.db.query("portfolio").collect();
        return all.sort((a, b) => a.displayOrder - b.displayOrder);
    },
});

export const get = query({
    args: { id: v.id("portfolio") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
    },
});

export const create = mutation({
    args: {
        title: v.string(),
        description: v.string(),
        beforeImageStorageId: v.optional(v.id("_storage")),
        afterImageStorageId: v.optional(v.id("_storage")),
        displayOrder: v.number(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("portfolio", {
            ...args,
            isVisible: true,
            createdAt: Date.now(),
        });
    },
});

export const update = mutation({
    args: {
        id: v.id("portfolio"),
        title: v.optional(v.string()),
        description: v.optional(v.string()),
        beforeImageStorageId: v.optional(v.id("_storage")),
        afterImageStorageId: v.optional(v.id("_storage")),
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
    args: { id: v.id("portfolio") },
    handler: async (ctx, args) => {
        const item = await ctx.db.get(args.id);
        if (item?.beforeImageStorageId) await ctx.storage.delete(item.beforeImageStorageId);
        if (item?.afterImageStorageId) await ctx.storage.delete(item.afterImageStorageId);
        await ctx.db.delete(args.id);
    },
});

export const toggleVisibility = mutation({
    args: { id: v.id("portfolio") },
    handler: async (ctx, args) => {
        const item = await ctx.db.get(args.id);
        if (!item) throw new Error("Portfolio item not found");
        await ctx.db.patch(args.id, { isVisible: !item.isVisible });
    },
});

export const reorder = mutation({
    args: { orderedIds: v.array(v.id("portfolio")) },
    handler: async (ctx, args) => {
        for (let i = 0; i < args.orderedIds.length; i++) {
            await ctx.db.patch(args.orderedIds[i], { displayOrder: i });
        }
    },
});
