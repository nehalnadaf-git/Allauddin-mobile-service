import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    categories: defineTable({
        name: v.string(),
        description: v.optional(v.string()),
        slug: v.optional(v.string()),
        displayOrder: v.number(),
        isVisible: v.boolean(),
        createdAt: v.number(),
    }),

    products: defineTable({
        name: v.string(),
        categoryId: v.id("categories"),
        price: v.number(),
        priceRange: v.optional(v.string()),
        imageStorageId: v.optional(v.id("_storage")),
        description: v.optional(v.string()),
        isInStock: v.boolean(),
        isVisible: v.boolean(),
        displayOrder: v.number(),
        createdAt: v.number(),
        // Offer system
        offerType: v.optional(v.union(v.literal("none"), v.literal("discount"), v.literal("bogo"))),
        discountPercentage: v.optional(v.number()),
        discountedPrice: v.optional(v.number()),
    }).index("by_category", ["categoryId"]),

    reviews: defineTable({
        customerName: v.string(),
        reviewText: v.string(),
        starRating: v.number(),
        status: v.union(v.literal("pending"), v.literal("approved"), v.literal("rejected")),
        submittedAt: v.number(),
        reviewedAt: v.optional(v.number()),
    }).index("by_status", ["status"]),

    portfolio: defineTable({
        title: v.string(),
        description: v.string(),
        beforeImageStorageId: v.optional(v.id("_storage")),
        afterImageStorageId: v.optional(v.id("_storage")),
        isVisible: v.boolean(),
        displayOrder: v.number(),
        createdAt: v.number(),
    }),

    services: defineTable({
        name: v.string(),
        description: v.string(),
        startingPrice: v.number(),
        iconName: v.string(),
        isVisible: v.boolean(),
        displayOrder: v.number(),
        createdAt: v.number(),
    }),

    banners: defineTable({
        type: v.union(
            v.literal("ticker"),
            v.literal("promo_landing"),
            v.literal("service_highlight"),
            v.literal("promo_accessories")
        ),
        headingText: v.string(),
        subText: v.optional(v.string()),
        ctaLabel: v.optional(v.string()),
        ctaLink: v.optional(v.string()),
        colorTheme: v.optional(v.union(v.literal("blue"), v.literal("gold"), v.literal("red"))),
        isVisible: v.boolean(),
        updatedAt: v.optional(v.number()),
    }).index("by_type", ["type"]),

    brands: defineTable({
        name: v.string(),
        logoStorageId: v.optional(v.id("_storage")),
        isVisible: v.boolean(),
        displayOrder: v.number(),
        createdAt: v.optional(v.number()),
    }),

    trustItems: defineTable({
        iconName: v.string(),
        label: v.string(),
        description: v.string(),
        isVisible: v.boolean(),
        displayOrder: v.number(),
    }),

    howItWorksSteps: defineTable({
        stepNumber: v.union(v.literal(1), v.literal(2), v.literal(3)),
        iconName: v.string(),
        title: v.string(),
        description: v.string(),
    }),

    settings: defineTable({
        shopName: v.string(),
        tagline: v.string(),
        whatsappNumber: v.string(),
        upiId: v.string(),
        workingHoursStart: v.string(),
        workingHoursEnd: v.string(),
        address: v.string(),
        googleMapsEmbedUrl: v.string(),
        ownerImageStorageId: v.optional(v.id("_storage")),
        socialLinks: v.array(
            v.object({
                platform: v.string(),
                url: v.string(),
                isVisible: v.boolean(),
                displayOrder: v.number(),
            })
        ),
        inStoreNoticeText: v.string(),
        inStoreNoticeVisible: v.boolean(),
    }),

    adminUsers: defineTable({
        username: v.string(),
        passwordHash: v.string(),
        failedAttempts: v.number(),
        lockedUntil: v.optional(v.number()),
        lastLoginAt: v.optional(v.number()),
    }).index("by_username", ["username"]),

    adminSessions: defineTable({
        userId: v.id("adminUsers"),
        token: v.string(),
        createdAt: v.number(),
        expiresAt: v.number(),
    }).index("by_token", ["token"]),

    activityLog: defineTable({
        action: v.string(),
        details: v.string(),
        timestamp: v.number(),
    }),
});
