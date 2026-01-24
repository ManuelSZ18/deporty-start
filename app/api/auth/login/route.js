import { NextResponse } from 'next/server';

/**
 * POST /api/auth/login
 * Autentica un usuario
 */
export async function POST(request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        // Validación básica
        if (!email || !password) {
            return NextResponse.json(
                {
                    status: 'error',
                    message: '❌ Email y password son requeridos'
                },
                { status: 400 }
            );
        }

        // TODO: Verificar credenciales en BD
        // TODO: Generar JWT
        // TODO: Establecer cookie segura

        return NextResponse.json(
            {
                status: 'success',
                message: '✅ Login exitoso',
                token: 'jwt_token_aqui'
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error en login:', error);
        return NextResponse.json(
            {
                status: 'error',
                message: '❌ Error al iniciar sesión'
            },
            { status: 500 }
        );
    }
}

/**
 * OPTIONS /api/auth/login
 * Maneja CORS
 */
export async function OPTIONS() {
    return NextResponse.json(null, {
        headers: {
            'Access-Control-Allow-Origin': process.env.CORS_ORIGIN || '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
    });
}
