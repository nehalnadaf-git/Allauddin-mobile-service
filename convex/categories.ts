import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
    handler: async (ctx) => {
        return await ctx.db
            .query("categories")
            .collect()
            .then((cats) => cats.sort((a, b) => a.displayOrder - b.displayOrder));
    },
});

// Alias for list
export const listAll = list;


export const listVisible = query({
    handler: async (ctx) => {
        const all = await ctx.db.query("categories").collect();
        return all
            .filter((c) => c.isVisible)
            .sort((a, b) => a.displayOrder - b.displayOrder);
    },
});

export const get = query({
    args: { id: v.id("categories") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
    },
});

export const create = mutation({
    args: {
        name: v.string(),
        description: v.optional(v.string()),
        displayOrder: v.number(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("categories", {
            name: args.name,
            description: args.description,
            displayOrder: args.displayOrder,
            isVisible: true,
            createdAt: Date.now(),
        });
    },
});

export const update = mutation({
    args: {
        id: v.id("categories"),
        name: v.optional(v.string()),
        description: v.optional(v.string()),
        displayOrder: v.optional(v.number()),
        isVisible: v.optional(v.boolean()),
    },
    handler: async (ctx, args) => {
        const { id, ...fields } = args;
        const updates: Record<string, unknown> = {};
        if (fields.name !== undefined) updates.name = fields.name;
        if (fields.description !== undefined) updates.description = fields.description;
        if (fields.displayOrder !== undefined) updates.displayOrder = fields.displayOrder;
        if (fields.isVisible !== undefined) updates.isVisible = fields.isVisible;
        await ctx.db.patch(id, updates);
    },
});

export const remove = mutation({
    args: { id: v.id("categories") },
    handler: async (ctx, args) => {
        const products = await ctx.db
            .query("products")
            .withIndex("by_category", (q) => q.eq("categoryId", args.id))
            .collect();
        if (products.length > 0) {
            throw new Error(
                `Cannot delete category with ${products.length} active product(s). Remove or reassign products first.`
            );
        }
        await ctx.db.delete(args.id);
    },
});

export const toggleVisibility = mutation({
    args: { id: v.id("categories") },
    handler: async (ctx, args) => {
        const cat = await ctx.db.get(args.id);
        if (!cat) throw new Error("Category not found");
        await ctx.db.patch(args.id, { isVisible: !cat.isVisible });
    },
});

export const reorder = mutation({
    args: {
        orderedIds: v.array(v.id("categories")),
    },
    handler: async (ctx, args) => {
        for (let i = 0; i < args.orderedIds.length; i++) {
            await ctx.db.patch(args.orderedIds[i], { displayOrder: i });
        }
    },
});
