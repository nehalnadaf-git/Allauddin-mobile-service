import React from "react";

interface PlaceholderImageProps {
    label: string;
    className?: string;
    aspectRatio?: string;
}

export default function PlaceholderImage({
    label,
    className = "",
    aspectRatio = "aspect-square",
}: PlaceholderImageProps) {
    return (
        <div
            className={`bg-light-grey border border-border-grey flex items-center justify-center ${aspectRatio} ${className}`}
        >
            <span className="text-muted text-sm font-dm text-center px-4">{label}</span>
        </div>
    );
}
