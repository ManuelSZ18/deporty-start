'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import '../styles/auth.css';

export default function LoginPage() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

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
                setMessageType('success');
                setMessage('✅ ' + data.message);
                // TODO: Guardar token y redirigir
                setTimeout(() => {
                    // window.location.href = '/dashboard';
                }, 1500);
            } else {
                setMessageType('error');
                setMessage('❌ ' + data.message);
            }
        } catch (error) {
            setMessageType('error');
            setMessage('❌ Error en la conexión');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="auth-page auth-page--login">
            <div className="auth-header">
                <Link href="/" className="auth-back">
                    ← Volver
                </Link>
            </div>

            <div className="auth-container">
                <div className="auth-content">
                    {/* Logo Section */}
                    <div className="auth-logo">
                        <Image
                            src="/assets/images/icon.png"
                            alt="Deporty"
                            width={80}
                            height={80}
                        />
                    </div>

                    {/* Title Section */}
                    <div className="auth-title-section">
                        <h1 className="auth-title">Iniciar Sesión</h1>
                        <p className="auth-subtitle">Bienvenido de nuevo a Deporty</p>
                    </div>

                    {/* Form Section */}
                    <form onSubmit={handleSubmit} className="auth-form form-group">
                        <div className="form-field">
                            <label className="form-label" htmlFor="email">
                                Correo Electrónico
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                className="input"
                                placeholder="tu@email.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                aria-label="Correo electrónico"
                            />
                        </div>

                        <div className="form-field">
                            <label className="form-label" htmlFor="password">
                                Contraseña
                            </label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                className="input"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                aria-label="Contraseña"
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="btn btn--primary btn--full btn--lg"
                            disabled={loading}
                        >
                            {loading ? 'Iniciando Sesión...' : 'Iniciar Sesión'}
                        </button>
                    </form>

                    {/* Message Alert */}
                    {message && (
                        <div className={`alert alert--${messageType}`}>
                            {message}
                        </div>
                    )}

                    {/* Help Text */}
                    <div className="auth-help">
                        <p>
                            ¿Olvidaste tu contraseña?{' '}
                            <Link href="#" className="auth-link">
                                Recuperarla
                            </Link>
                        </p>
                    </div>

                    {/* Sign Up Link */}
                    <div className="auth-footer">
                        <p>
                            ¿No tienes cuenta?{' '}
                            <Link href="/signup" className="auth-link auth-link--strong">
                                Crea una cuenta
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
