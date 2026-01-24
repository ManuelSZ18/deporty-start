// API route: POST /api/v1/auth/login
// Vercel Function optimizada para serverless

const { jsonParser, securityHeaders } = require('../../middleware/handlers');
const authController = require('../../controllers/authController');

export default async function handler(req, res) {
    // Aplicar middleware
    await new Promise((resolve) => {
        securityHeaders(req, res, () => {
            jsonParser(req, res, resolve);
        });
    });

    // Solo permitir POST
    if (req.method !== 'POST') {
        return res.status(405).json({
            status: 'error',
            message: '❌ Método no permitido'
        });
    }

    // Ejecutar controlador
    await authController.loginUsuario(req, res);
}
