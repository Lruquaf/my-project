/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    basePath: "",
    pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js"],
    webpack: (config) => {
        config.resolve.fallback = {
            fs: false,
            path: false,
            stream: false,
            constants: false,
        };
        return config;
    },
};

module.exports = nextConfig;
