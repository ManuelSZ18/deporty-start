import { db } from '$lib/server/db';
import { users } from '$lib/server/schema';
import { error, json } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import * as bcrypt from 'bcryptjs';

export async function POST({ request }) {
    const { nombres, apellidos, email, password, fechaNacimiento, pais, ciudad, roles, deportes } = await request.json();

    // 1. Validaciones Básicas (Backend First)
    if (!email || !password || !nombres || !apellidos) {
        return error(400, 'Faltan campos obligatorios');
    }

    try {
        // 2. Verificar si el usuario ya existe
        const existingUser = await db.select().from(users).where(eq(users.email, email));

        if (existingUser.length > 0) {
            return error(409, 'El correo electrónico ya está registrado');
        }

        // 3. Hash del Password
        const passwordHash = await bcrypt.hash(password, 10);

        // 4. Crear Usuario
        // Nota: Por ahora guardamos todo en una estructura plana o JSON simplificado si es necesario.
        // Dado que el schema original era simple, vamos a insertar lo básico y dejar los otros campos preparados
        // para cuando ampliemos el schema a incluir 'profiles' o campos JSON.

        // Vamos a asumir que actualizaremos el schema muy pronto, pero por ahora insertamos lo que cabe.
        // Espera, el schema actual NO tiene roles, deporte, etc. Solo tiene: id, firstName, lastName, email, passwordHash, role.
        // Voy a mapear 'roles' (array) al campo 'role' (string) uniendolos por coma por ahora para no romper.

        await db.insert(users).values({
            firstName: nombres,
            lastName: apellidos,
            email,
            passwordHash,
            role: roles.join(','), // Simple hack temporero hasta tener tabla de roles o columna JSON
        });

        return json({ success: true, message: 'Usuario registrado exitosamente' });

    } catch (err) {
        console.error('Error en registro:', err);
        return error(500, 'Error interno del servidor al procesar el registro');
    }
}
