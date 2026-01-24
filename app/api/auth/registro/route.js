import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

/**
 * POST /api/auth/registro
 * Registra un nuevo usuario en la base de datos
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

        // Validar email único
        const usuarioExistente = await prisma.usuario.findUnique({
            where: { email }
        });

        if (usuarioExistente) {
            return NextResponse.json(
                {
                    status: 'error',
                    message: '❌ El email ya está registrado'
                },
                { status: 409 }
            );
        }

        // Hash de contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Guardar en base de datos
        const usuario = await prisma.usuario.create({
            data: {
                email,
                nombre,
                password: hashedPassword
            }
        });

        return NextResponse.json(
            {
                status: 'success',
                message: '✅ Usuario registrado exitosamente',
                data: {
                    id: usuario.id,
                    email: usuario.email,
                    nombre: usuario.nombre
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
