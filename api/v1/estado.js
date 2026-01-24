// API route: GET /api/v1/estado
// Health check para monitoreo

export default async function handler(req, res) {
    // Headers de seguridad
    res.setHeader('Access-Control-Allow-Origin', process.env.CORS_ORIGIN || '*');
    res.setHeader('Cache-Control', 'public, max-age=60');
    res.setHeader('Content-Type', 'application/json');
    
    res.status(200).json({
        status: 'success',
        mensaje: '🦊 El motor de Deporty está listo en Vercel',
        timestamp: new Date().toISOString(),
        environment: process.env.VERCEL_ENV || 'development'
    });
}
