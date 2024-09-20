/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/playground/s',
                destination: '/playground', // Matched parameters can be used in the destination
                permanent: true,
            },
        ]
    },
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '5000',
                pathname: '/images/**',
            },
        ],
    },
}

module.exports = nextConfig
