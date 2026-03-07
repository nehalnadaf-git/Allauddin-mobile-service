import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
    handler: async (ctx) => {
        const products = await ctx.db.query("products").collect();
        return products.sort((a, b) => a.displayOrder - b.displayOrder);
    },
});

// All products sorted by newest first (admin use)
export const listAll = query({
    handler: async (ctx) => {
        const products = await ctx.db.query("products").collect();
        return products.sort((a, b) => b.createdAt - a.createdAt);
    },
});

export const listVisible = query({
    handler: async (ctx) => {
        const all = await ctx.db.query("products").collect();
        return all
            .filter((p) => p.isVisible)
            .sort((a, b) => a.displayOrder - b.displayOrder);
    },
});


export const listByCategory = query({
    args: { categoryId: v.id("categories") },
    handler: async (ctx, args) => {
        const products = await ctx.db
            .query("products")
            .withIndex("by_category", (q) => q.eq("categoryId", args.categoryId))
            .collect();
        return products
            .filter((p) => p.isVisible)
            .sort((a, b) => a.displayOrder - b.displayOrder);
    },
});

export const get = query({
    args: { id: v.id("products") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
    },
});

export const create = mutation({
    args: {
        name: v.string(),
        categoryId: v.id("categories"),
        price: v.number(),
        priceRange: v.optional(v.string()),
        imageStorageId: v.optional(v.id("_storage")),
        description: v.optional(v.string()),
        isInStock: v.boolean(),
        displayOrder: v.number(),
    },
    handler: async (ctx, args) => {
        const existing = await ctx.db.query("products").collect();
        if (existing.length >= 15) {
            throw new Error("Limit reached: You can only have up to 15 accessories.");
        }
        return await ctx.db.insert("products", {
            ...args,
            isVisible: true,
            createdAt: Date.now(),
        });
    },
});

export const update = mutation({
    args: {
        id: v.id("products"),
        name: v.optional(v.string()),
        categoryId: v.optional(v.id("categories")),
        price: v.optional(v.number()),
        priceRange: v.optional(v.string()),
        imageStorageId: v.optional(v.id("_storage")),
        description: v.optional(v.string()),
        isInStock: v.optional(v.boolean()),
        isVisible: v.optional(v.boolean()),
        displayOrder: v.optional(v.number()),
        offerType: v.optional(v.union(v.literal("none"), v.literal("discount"), v.literal("bogo"))),
        discountPercentage: v.optional(v.number()),
        discountedPrice: v.optional(v.number()),
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
    args: { id: v.id("products") },
    handler: async (ctx, args) => {
        const product = await ctx.db.get(args.id);
        if (product?.imageStorageId) {
            await ctx.storage.delete(product.imageStorageId);
        }
        await ctx.db.delete(args.id);
    },
});

export const bulkDelete = mutation({
    args: { ids: v.array(v.id("products")) },
    handler: async (ctx, args) => {
        for (const id of args.ids) {
            const product = await ctx.db.get(id);
            if (product?.imageStorageId) {
                await ctx.storage.delete(product.imageStorageId);
            }
            await ctx.db.delete(id);
        }
    },
});

export const bulkHide = mutation({
    args: { ids: v.array(v.id("products")) },
    handler: async (ctx, args) => {
        for (const id of args.ids) {
            await ctx.db.patch(id, { isVisible: false });
        }
    },
});

export const bulkChangeCategory = mutation({
    args: {
        ids: v.array(v.id("products")),
        categoryId: v.id("categories"),
    },
    handler: async (ctx, args) => {
        for (const id of args.ids) {
            await ctx.db.patch(id, { categoryId: args.categoryId });
        }
    },
});

export const toggleStock = mutation({
    args: { id: v.id("products") },
    handler: async (ctx, args) => {
        const product = await ctx.db.get(args.id);
        if (!product) throw new Error("Product not found");
        await ctx.db.patch(args.id, { isInStock: !product.isInStock });
    },
});

export const toggleVisibility = mutation({
    args: { id: v.id("products") },
    handler: async (ctx, args) => {
        const product = await ctx.db.get(args.id);
        if (!product) throw new Error("Product not found");
        await ctx.db.patch(args.id, { isVisible: !product.isVisible });
    },
});
