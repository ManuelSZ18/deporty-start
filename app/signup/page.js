'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import '../styles/auth.css';

export default function SignupPage() {
    const [formData, setFormData] = useState({ 
        nombre: '', 
        email: '', 
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        if (formData.password !== formData.confirmPassword) {
            setMessage('❌ Las contraseñas no coinciden');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('/api/auth/registro', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nombre: formData.nombre,
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('✅ ' + data.message);
                setFormData({ nombre: '', email: '', password: '', confirmPassword: '' });
                // TODO: Redirigir a login
                setTimeout(() => {
                    // window.location.href = '/login';
                }, 1500);
            } else {
                setMessage('❌ ' + data.message);
            }
        } catch (error) {
            setMessage('❌ Error en la conexión');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="auth-page">
            <div className="auth-container">
                <div className="auth-logo">
                    <Image
                        src="/assets/images/icon.png"
                        alt="Deporty"
                        width={80}
                        height={80}
                    />
                </div>

                <h1>Registrarse</h1>

                <form onSubmit={handleSubmit} className="auth-form">
                    <input
                        type="text"
                        name="nombre"
                        placeholder="Nombre completo"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirmar contraseña"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? 'Registrando...' : 'Registrarse'}
                    </button>
                </form>

                {message && <p className="auth-message">{message}</p>}

                <p className="auth-link">
                    ¿Ya tienes cuenta? <Link href="/login">Inicia sesión aquí</Link>
                </p>
            </div>
        </main>
    );
}
