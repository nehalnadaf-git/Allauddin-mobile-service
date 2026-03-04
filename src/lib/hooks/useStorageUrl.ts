"use client";

// useStorageUrl is a no-op in mock mode — the mock backend stores imageStorageId as a URL string directly
// In production with Convex, this would call api.storage.getUrl
export function useStorageUrl(storageId: string | null | undefined): string | null {
    // In mock mode, storageId is already a public URL string
    return storageId ?? null;
}
