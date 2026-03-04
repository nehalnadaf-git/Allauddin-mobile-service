/**
 * mockBackend.tsx — REAL CONVEX BRIDGE
 *
 * This file previously contained a localStorage-based mock backend.
 * It now transparently re-exports from real Convex so that all existing
 * component imports continue to work with zero changes.
 *
 * Components import: import { useQuery, useMutation, api } from "@/lib/mockBackend"
 * They now hit: convex/react hooks + the real generated Convex API.
 */

"use client";

import React from "react";

// Re-export real Convex hooks — same API signature as the mock
export { useQuery, useMutation, useConvex } from "convex/react";

// Re-export the real generated API — same structure as the mock `api` object
export { api } from "../../convex/_generated/api";

/**
 * MockProvider is now a no-op passthrough.
 * The real ConvexClientProvider in layout.tsx handles the connection.
 * Keeping this export so no import in layout.tsx breaks.
 */
export function MockProvider({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

// Keep useMockContext for any legacy usage — returns a safe stub
export const useMockContext = () => {
    throw new Error("useMockContext: MockProvider is no longer active. Use useQuery/useMutation from convex/react directly.");
};
