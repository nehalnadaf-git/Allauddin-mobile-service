import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes
const SESSION_DURATION_MS = 30 * 60 * 1000; // 30 minutes

function simpleHash(password: string): string {
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
        const char = password.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0;
    }
    return "h_" + Math.abs(hash).toString(36) + "_" + password.length;
}

function generateToken(): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 64; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

export const login = mutation({
    args: {
        username: v.string(),
        password: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("adminUsers")
            .withIndex("by_username", (q) => q.eq("username", args.username))
            .first();

        if (!user) {
            throw new Error("Invalid username or password");
        }

        // Check lockout
        if (user.lockedUntil && Date.now() < user.lockedUntil) {
            const minutesLeft = Math.ceil((user.lockedUntil - Date.now()) / 60000);
            throw new Error(`Account locked. Try again in ${minutesLeft} minute(s).`);
        }

        // Verify password
        const passwordHash = simpleHash(args.password);
        if (user.passwordHash !== passwordHash) {
            const newAttempts = user.failedAttempts + 1;
            const updates: Record<string, unknown> = { failedAttempts: newAttempts };
            if (newAttempts >= MAX_FAILED_ATTEMPTS) {
                updates.lockedUntil = Date.now() + LOCKOUT_DURATION_MS;
                updates.failedAttempts = 0;
            }
            await ctx.db.patch(user._id, updates);
            if (newAttempts >= MAX_FAILED_ATTEMPTS) {
                throw new Error("Too many failed attempts. Account locked for 15 minutes.");
            }
            throw new Error("Invalid username or password");
        }

        // Reset failed attempts
        await ctx.db.patch(user._id, {
            failedAttempts: 0,
            lockedUntil: undefined,
            lastLoginAt: Date.now(),
        });

        // Invalidate existing sessions
        const existingSessions = await ctx.db
            .query("adminSessions")
            .filter((q) => q.eq(q.field("userId"), user._id))
            .collect();
        for (const session of existingSessions) {
            await ctx.db.delete(session._id);
        }

        // Create new session
        const token = generateToken();
        await ctx.db.insert("adminSessions", {
            userId: user._id,
            token,
            createdAt: Date.now(),
            expiresAt: Date.now() + SESSION_DURATION_MS,
        });

        return { token, username: user.username };
    },
});

export const validateSession = query({
    args: { token: v.string() },
    handler: async (ctx, args) => {
        const session = await ctx.db
            .query("adminSessions")
            .withIndex("by_token", (q) => q.eq("token", args.token))
            .first();

        if (!session) return null;
        if (Date.now() > session.expiresAt) return null;

        const user = await ctx.db.get(session.userId);
        if (!user) return null;

        return { userId: user._id, username: user.username };
    },
});

export const refreshSession = mutation({
    args: { token: v.string() },
    handler: async (ctx, args) => {
        const session = await ctx.db
            .query("adminSessions")
            .withIndex("by_token", (q) => q.eq("token", args.token))
            .first();

        if (!session || Date.now() > session.expiresAt) {
            throw new Error("Session expired");
        }

        await ctx.db.patch(session._id, {
            expiresAt: Date.now() + SESSION_DURATION_MS,
        });
    },
});

export const logout = mutation({
    args: { token: v.string() },
    handler: async (ctx, args) => {
        const session = await ctx.db
            .query("adminSessions")
            .withIndex("by_token", (q) => q.eq("token", args.token))
            .first();
        if (session) {
            await ctx.db.delete(session._id);
        }
    },
});

export const changePassword = mutation({
    args: {
        token: v.string(),
        currentPassword: v.string(),
        newPassword: v.string(),
    },
    handler: async (ctx, args) => {
        const session = await ctx.db
            .query("adminSessions")
            .withIndex("by_token", (q) => q.eq("token", args.token))
            .first();
        if (!session || Date.now() > session.expiresAt) {
            throw new Error("Session expired. Please login again.");
        }

        const user = await ctx.db.get(session.userId);
        if (!user) throw new Error("User not found");

        if (user.passwordHash !== simpleHash(args.currentPassword)) {
            throw new Error("Current password is incorrect");
        }

        await ctx.db.patch(user._id, {
            passwordHash: simpleHash(args.newPassword),
        });
    },
});

export const setupAdmin = mutation({
    args: {
        username: v.string(),
        password: v.string(),
    },
    handler: async (ctx, args) => {
        const existing = await ctx.db.query("adminUsers").first();
        if (existing) {
            throw new Error("Admin user already exists");
        }
        await ctx.db.insert("adminUsers", {
            username: args.username,
            passwordHash: simpleHash(args.password),
            failedAttempts: 0,
        });
    },
});
