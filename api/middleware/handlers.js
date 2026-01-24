// Middleware de seguridad para Vercel Functions
// Más ligero que helmet para funciones serverless

/**
 * Establece headers de seguridad
 */
const securityHeaders = (req, res, next) => {
    // CORS
    res.setHeader('Access-Control-Allow-Origin', process.env.CORS_ORIGIN || '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    // Seguridad
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    
    // Performance
    res.setHeader('Cache-Control', 'public, max-age=3600');
    
    if (req.method === 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
};

/**
 * Middleware para CORS
 */
const corsHandler = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
};

/**
 * Middleware para parsear JSON
 */
const jsonParser = (req, res, next) => {
    if (req.method === 'POST' || req.method === 'PUT') {
        let data = '';
        
        req.on('data', chunk => {
            data += chunk;
        });
        
        req.on('end', () => {
            try {
                req.body = JSON.parse(data);
            } catch (e) {
                req.body = {};
            }
            next();
        });
    } else {
        req.body = {};
        next();
    }
};

module.exports = {
    securityHeaders,
    corsHandler,
    jsonParser
};
