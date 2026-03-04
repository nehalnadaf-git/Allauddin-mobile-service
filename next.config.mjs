/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        // Convex backend files use generated types that are only fully available
        // after `npx convex dev`. We skip build-time type checking and rely on
        // IDE + Convex CLI for that.
        ignoreBuildErrors: true,
    },
};

export default nextConfig;
