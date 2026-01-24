import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

/**
 * POST /api/auth/login
 * Autentica un usuario y devuelve sus datos
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

        // Buscar usuario en BD
        const usuario = await prisma.usuario.findUnique({
            where: { email }
        });

        if (!usuario) {
            return NextResponse.json(
                {
                    status: 'error',
                    message: '❌ Usuario no encontrado'
                },
                { status: 401 }
            );
        }

        // Verificar contraseña
        const esValida = await bcrypt.compare(password, usuario.password);

        if (!esValida) {
            return NextResponse.json(
                {
                    status: 'error',
                    message: '❌ Contraseña incorrecta'
                },
                { status: 401 }
            );
        }

        // TODO: Generar JWT token real
        // TODO: Configurar cookie segura en producción

        return NextResponse.json(
            {
                status: 'success',
                message: '✅ Login exitoso',
                usuario: {
                    id: usuario.id,
                    email: usuario.email,
                    nombre: usuario.nombre
                }
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
