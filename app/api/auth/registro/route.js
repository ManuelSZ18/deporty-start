import { NextResponse } from 'next/server';

/**
 * POST /api/auth/registro
 * Registra un nuevo usuario
 */
export async function POST(request) {
    try {
        const body = await request.json();
        const { email, password, nombre } = body;

        // Validación básica
        if (!email || !password || !nombre) {
            return NextResponse.json(
                {
                    status: 'error',
                    message: '❌ Email, password y nombre son requeridos'
                },
                { status: 400 }
            );
        }

        // TODO: Validar email único
        // TODO: Hash de contraseña (bcrypt)
        // TODO: Guardar en base de datos

        return NextResponse.json(
            {
                status: 'success',
                message: '✅ Usuario registrado exitosamente',
                data: {
                    email,
                    nombre
                }
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error en registro:', error);
        return NextResponse.json(
            {
                status: 'error',
                message: '❌ Error al registrar usuario'
            },
            { status: 500 }
        );
    }
}

/**
 * OPTIONS /api/auth/registro
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
