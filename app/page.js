'use client'

import Image from 'next/image';

export default function Home() {
  const roles = [
    { icon: '🏃', nombre: 'Deportistas', descripcion: 'Participa en competencias y gestiona tu perfil deportivo' },
    { icon: '👨‍🏫', nombre: 'Entrenadores', descripcion: 'Inscribe y gestiona a tus atletas en torneos' },
    { icon: '🏆', nombre: 'Organizadores', descripcion: 'Crea y administra eventos deportivos profesionales' },
    { icon: '⚽', nombre: 'Clubes & Ligas', descripcion: 'Gestiona equipos y organiza competencias oficiales' },
    { icon: '👨‍⚖️', nombre: 'Jueces & Árbitros', descripcion: 'Participa como oficial en eventos deportivos' },
  ]

  const caracteristicas = [
    { icon: '⚡', titulo: 'Ultra Rápida', descripcion: 'Rendimiento optimizado para la mejor experiencia' },
    { icon: '🎯', titulo: 'Multi-Rol', descripcion: 'Un usuario puede tener múltiples roles con insignias' },
    { icon: '📊', titulo: 'Gestión Completa', descripcion: 'Crea, organiza y participa en torneos fácilmente' },
    { icon: '🌐', titulo: 'Moderna', descripcion: 'Tecnología de punta con diseño intuitivo' },
  ]

  return (
    <main>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <Image
            src="/logo.svg"
            alt="Deporty Logo"
            width={140}
            height={140}
            className="hero-logo"
            priority
          />
          <div className="hero-badge">
            <span className="badge-dot"></span>
            En Construcción
          </div>
          <h1 className="hero-title">
            Deporty
          </h1>
          <p className="hero-subtitle">
            La plataforma integral de gestión deportiva
          </p>
          <p className="hero-description">
            Conectamos a toda la comunidad deportiva en un solo lugar: atletas, entrenadores, organizadores, clubes, ligas, jueces y árbitros.
          </p>
          <div className="hero-cta">
            <button className="btn-primary" disabled>
              Próximamente
            </button>
            <button className="btn-secondary" onClick={() => document.getElementById('roles').scrollIntoView({ behavior: 'smooth' })}>
              Conocer más
            </button>
          </div>
        </div>
      </section>

      {/* Características */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">¿Por qué Deporty?</h2>
          <div className="features-grid">
            {caracteristicas.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.titulo}</h3>
                <p>{feature.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section id="roles" className="roles">
        <div className="container">
          <h2 className="section-title">Para Toda la Comunidad Deportiva</h2>
          <p className="section-description">
            Regístrate con uno o múltiples roles según tu participación en el mundo deportivo
          </p>
          <div className="roles-grid">
            {roles.map((rol, index) => (
              <div key={index} className="role-card">
                <div className="role-icon">{rol.icon}</div>
                <h3>{rol.nombre}</h3>
                <p>{rol.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Funcionalidades */}
      <section className="funcionalidades">
        <div className="container">
          <h2 className="section-title">Funcionalidades Principales</h2>
          <div className="funcionalidades-list">
            <div className="func-item">
              <div className="func-number">01</div>
              <div className="func-content">
                <h3>Creación de Torneos</h3>
                <p>Organiza competencias, eventos y torneos con configuración específica por deporte</p>
              </div>
            </div>
            <div className="func-item">
              <div className="func-number">02</div>
              <div className="func-content">
                <h3>Inscripciones Inteligentes</h3>
                <p>Los usuarios se registran directamente o son inscritos por clubes y entrenadores</p>
              </div>
            </div>
            <div className="func-item">
              <div className="func-number">03</div>
              <div className="func-content">
                <h3>Gestión Multi-Deporte</h3>
                <p>Configuración personalizada según las reglas y características de cada disciplina</p>
              </div>
            </div>
            <div className="func-item">
              <div className="func-number">04</div>
              <div className="func-content">
                <h3>Sistema de Insignias</h3>
                <p>Identifica fácilmente los roles de cada usuario con insignias visuales</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Estamos Construyendo Algo Increíble</h2>
            <p>Deporty está en desarrollo activo. Pronto tendremos una plataforma completa para revolucionar la gestión deportiva.</p>
            <div className="progress-bar">
              <div className="progress-fill" style={{width: '25%'}}></div>
            </div>
            <p className="progress-text">Avance del proyecto: 25%</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2026 Deporty. Todos los derechos reservados.</p>
          <p className="footer-note">Plataforma en desarrollo 🚀</p>
        </div>
      </footer>
    </main>
  )
}
