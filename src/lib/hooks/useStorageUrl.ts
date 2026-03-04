"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";

/**
 * Resolves a Convex storage ID to a public CDN URL.
 * Uses the real Convex storage:getUrl query.
 */
export function useStorageUrl(storageId: string | null | undefined): string | null {
    // Only call the query if we have a real storage ID (not a URL string)
    const isStorageId = !!storageId && !storageId.startsWith("http");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const url = useQuery(
        api.storage.getUrl,
        isStorageId ? { storageId: storageId as Id<"_storage"> } : "skip"
    );
    if (!storageId) return null;
    // If it's already a URL (mock mode), return directly
    if (storageId.startsWith("http")) return storageId;
    return url ?? null;
}
