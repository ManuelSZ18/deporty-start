'use client';

import Link from 'next/link';
import Image from 'next/image';
import EventCard from './components/EventCard';
import './styles/index.css';

export default function Home() {
    const upcomingEvents = [
        {
            id: 1,
            title: '100m Estilo Libre',
            subtitle: 'Categoría Adultos',
            date: '22 de Febrero, 2026',
            time: '09:00 AM',
            location: 'Piscina Olímpica de Madrid',
            distance: '100m',
            category: 'Adultos',
            price: '€25.00',
            status: 'open',
            onRegister: () => alert('¡Inscripción abierta!'),
            onViewDetails: () => alert('Viendo detalles del evento'),
        },
        {
            id: 2,
            title: '200m Espalda',
            subtitle: 'Categoría Juvenil',
            date: '24 de Febrero, 2026',
            time: '10:30 AM',
            location: 'Centro Acuático Colmenarejo',
            distance: '200m',
            category: 'Juvenil',
            price: '€18.00',
            status: 'open',
            onRegister: () => alert('¡Inscripción abierta!'),
            onViewDetails: () => alert('Viendo detalles del evento'),
        },
        {
            id: 3,
            title: '400m Combinado Individual',
            subtitle: 'Campeonato Regional',
            date: '28 de Febrero, 2026',
            time: '08:00 AM',
            location: 'Piscina Polideportiva',
            distance: '400m',
            category: 'Senior',
            price: '€35.00',
            status: 'closing',
            onRegister: () => alert('¡Pronto cierra la inscripción!'),
            onViewDetails: () => alert('Viendo detalles del evento'),
        },
        {
            id: 4,
            title: '50m Mariposa',
            subtitle: 'Categoría Infantil',
            date: '01 de Marzo, 2026',
            time: '14:00 PM',
            location: 'Piscina Municipal San Martín',
            distance: '50m',
            category: 'Infantil',
            price: '€12.00',
            status: 'open',
            onRegister: () => alert('¡Inscripción abierta!'),
            onViewDetails: () => alert('Viendo detalles del evento'),
        },
        {
            id: 5,
            title: 'Relevos 4x100m Libre',
            subtitle: 'Campeonato Interclubs',
            date: '05 de Marzo, 2026',
            time: '11:00 AM',
            location: 'Piscina Olímpica de Madrid',
            distance: '4x100m',
            category: 'Equipos',
            price: '€60.00',
            status: 'full',
            onRegister: () => alert('Este evento está completo'),
            onViewDetails: () => alert('Viendo detalles del evento'),
        },
        {
            id: 6,
            title: 'Entrenamiento Abierto',
            subtitle: 'Todas las categorías',
            date: '10 de Marzo, 2026',
            time: '16:00 PM',
            location: 'Centro de Entrenamiento Acuático',
            distance: 'Libre',
            category: 'Abierto',
            price: 'Gratis',
            status: 'open',
            onRegister: () => alert('¡Inscripción abierta!'),
            onViewDetails: () => alert('Viendo detalles del evento'),
        },
    ];

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
                            <span className="brand-ticker__item">Natación 2026</span>
                        </div>
                    </section>
                </span>

                <p className="hero__subtitle">
                    Descubre y únete a eventos de natación épicos. Conecta con atletas, 
                    mejora tu desempeño y compite en el nivel que prefieras.
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

            {/* Events Section */}
            <section className="events-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Próximos Eventos 🏊</h2>
                        <p className="section-subtitle">
                            Explora los mejores eventos de natación en 2026
                        </p>
                    </div>

                    <div className="grid grid--3">
                        {upcomingEvents.map((event) => (
                            <EventCard
                                key={event.id}
                                title={event.title}
                                subtitle={event.subtitle}
                                date={event.date}
                                time={event.time}
                                location={event.location}
                                distance={event.distance}
                                category={event.category}
                                price={event.price}
                                status={event.status}
                                onRegister={event.onRegister}
                                onViewDetails={event.onViewDetails}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="container">
                    <h2 className="section-title">¿Por qué Deporty?</h2>
                    <div className="grid grid--3">
                        <div className="feature-card">
                            <div className="feature-icon">🎯</div>
                            <h3 className="feature-title">Eventos Curados</h3>
                            <p className="feature-description">
                                Acceso a los mejores eventos de natación seleccionados por expertos
                            </p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">📊</div>
                            <h3 className="feature-title">Seguimiento</h3>
                            <p className="feature-description">
                                Registra tu progreso y sigue tus marcas personales
                            </p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">👥</div>
                            <h3 className="feature-title">Comunidad</h3>
                            <p className="feature-description">
                                Conecta con otros nadadores y comparte tu pasión por el deporte
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
