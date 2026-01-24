'use client';

import Link from 'next/link';
import Image from 'next/image';
import './styles/index.css';

export default function Home() {
    return (
        <main className="landing-page" data-page="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero__logo">
                    <Image
                        src="/assets/images/icon.png"
                        alt="Logotipo de Deporty"
                        className="hero-logo-img"
                        width={120}
                        height={120}
                        priority
                    />
                </div>

                <h1 className="hero__title">Deporty</h1>

                <span className="brand-rotator" aria-live="polite">
                    <section className="brand-ticker" aria-label="Deportes soportados">
                        <div className="brand-ticker__inner">
                            <span className="brand-ticker__item">App</span>
                        </div>
                    </section>
                </span>

                <p className="hero__subtitle">
                    Gestiona actividades deportivas, eventos y usuarios de forma sencilla. 
                    Conecta con tu comunidad y organiza como nunca antes.
                </p>

                <div className="hero__actions mobile-cta">
                    <Link href="/login" className="button button--secondary">
                        Iniciar Sesión
                    </Link>
                    <Link href="/signup" className="button button--primary">
                        Registrarse Ahora
                    </Link>
                </div>
            </section>
        </main>
    );
}
