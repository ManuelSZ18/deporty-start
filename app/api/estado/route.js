import { NextResponse } from 'next/server';

/**
 * GET /api/estado
 * Health check de la API
 */
export async function GET() {
    try {
        return NextResponse.json(
            {
                status: 'success',
                mensaje: '🦊 El motor de Deporty está listo en Vercel con Next.js',
                timestamp: new Date().toISOString(),
                environment: process.env.NODE_ENV || 'development'
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error en estado:', error);
        return NextResponse.json(
            {
                status: 'error',
                message: '❌ Error al obtener estado'
            },
            { status: 500 }
        );
    }
}

/**
 * OPTIONS /api/estado
 * Maneja CORS
 */
export async function OPTIONS() {
    return NextResponse.json(null, {
        headers: {
            'Access-Control-Allow-Origin': process.env.CORS_ORIGIN || '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
    });
}
