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
    const [messageType, setMessageType] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        if (formData.password !== formData.confirmPassword) {
            setMessageType('error');
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
                setMessageType('success');
                setMessage('✅ ' + data.message);
                setFormData({ nombre: '', email: '', password: '', confirmPassword: '' });
                // TODO: Redirigir a login
                setTimeout(() => {
                    // window.location.href = '/login';
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
        <main className="auth-page auth-page--signup">
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
                        <h1 className="auth-title">Crear Cuenta</h1>
                        <p className="auth-subtitle">Únete a la comunidad de nadadores</p>
                    </div>

                    {/* Form Section */}
                    <form onSubmit={handleSubmit} className="auth-form form-group">
                        <div className="form-field">
                            <label className="form-label" htmlFor="nombre">
                                Nombre Completo
                            </label>
                            <input
                                id="nombre"
                                type="text"
                                name="nombre"
                                className="input"
                                placeholder="Tu nombre completo"
                                value={formData.nombre}
                                onChange={handleChange}
                                required
                                aria-label="Nombre completo"
                            />
                        </div>

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

                        <div className="form-field">
                            <label className="form-label" htmlFor="confirmPassword">
                                Confirmar Contraseña
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                name="confirmPassword"
                                className="input"
                                placeholder="••••••••"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                aria-label="Confirmar contraseña"
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="btn btn--primary btn--full btn--lg"
                            disabled={loading}
                        >
                            {loading ? 'Creando Cuenta...' : 'Crear Cuenta'}
                        </button>
                    </form>

                    {/* Message Alert */}
                    {message && (
                        <div className={`alert alert--${messageType}`}>
                            {message}
                        </div>
                    )}

                    {/* Terms */}
                    <p style={{
                        fontSize: 'var(--font-size-xs)',
                        color: 'var(--text-tertiary)',
                        textAlign: 'center',
                        marginTop: 'var(--space-lg)',
                        marginBottom: 0
                    }}>
                        Al registrarte, aceptas nuestros términos y condiciones
                    </p>

                    {/* Sign In Link */}
                    <div className="auth-footer">
                        <p>
                            ¿Ya tienes cuenta?{' '}
                            <Link href="/login" className="auth-link auth-link--strong">
                                Inicia sesión
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
