/** @type {import('next').NextConfig} */
const withPWA = require("@ducanh2912/next-pwa").default({
    dest: "public",
    reloadOnOnline: true,
    cacheOnFrontEndNav: true,
    aggressiveFrontEndNavCaching: true,
    swcMinify: true,
    disable: false
});

const nextConfig = {
    compiler: {
        styledComponents: true
    }
}

module.exports = withPWA(nextConfig)
