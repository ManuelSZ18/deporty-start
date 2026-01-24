/** @type {import('next').NextConfig} */
const nextConfig = {
    // Optimizaciones de rendimiento
    compress: true,
    poweredByHeader: false,
    
    // Imágenes optimizadas
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [],
    },
    
    // Headers de seguridad
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff'
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY'
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block'
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin'
                    },
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=31536000; includeSubDomains'
                    }
                ]
            },
            {
                source: '/api/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'no-cache, no-store, must-revalidate'
                    }
                ]
            }
        ];
    },
    
    // Rewrites
    async rewrites() {
        return {
            beforeFiles: [
                {
                    source: '/api/:path*',
                    destination: '/api/:path*'
                }
            ]
        };
    }
};

module.exports = nextConfig;
