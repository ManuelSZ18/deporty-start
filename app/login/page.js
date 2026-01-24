'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import '../styles/auth.css';

export default function LoginPage() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('✅ ' + data.message);
                // TODO: Guardar token y redirigir
                setTimeout(() => {
                    // window.location.href = '/dashboard';
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

                <h1>Iniciar Sesión</h1>

                <form onSubmit={handleSubmit} className="auth-form">
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
                    <button type="submit" disabled={loading}>
                        {loading ? 'Iniciando...' : 'Iniciar Sesión'}
                    </button>
                </form>

                {message && <p className="auth-message">{message}</p>}

                <p className="auth-link">
                    ¿No tienes cuenta? <Link href="/signup">Regístrate aquí</Link>
                </p>
            </div>
        </main>
    );
}
