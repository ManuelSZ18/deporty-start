'use client';

/**
 * 🏊 EventCard Component
 * Tarjeta de Evento Deportivo para Natación
 * Sistema de Diseño 2026
 */

export function EventCard({
  title,
  subtitle,
  date,
  time,
  location,
  distance,
  category,
  price,
  status = 'open',
  image,
  onRegister,
  onViewDetails,
}) {
  const statusConfig = {
    open: { label: 'Abierto', class: 'badge--primary' },
    closing: { label: 'Cerrando', class: 'badge--warning' },
    closed: { label: 'Cerrado', class: 'badge--success' },
    full: { label: 'Completo', class: 'badge--coral' },
  };

  const currentStatus = statusConfig[status] || statusConfig.open;

  return (
    <div className="card card--event">
      {/* Header - Azul Atlántico con Gradiente */}
      <div className="card__header">
        {image && (
          <div
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'absolute',
              inset: 0,
              opacity: 0.3,
            }}
          />
        )}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h3 className="card__header-title">{title}</h3>
          {subtitle && <p className="card__header-subtitle">{subtitle}</p>}
        </div>
      </div>

      {/* Body - Cloud Dancer */}
      <div className="card__body">
        {/* Estado Badge */}
        <div style={{ marginBottom: 'var(--space-md)' }}>
          <span className={`badge ${currentStatus.class}`}>
            {currentStatus.label}
          </span>
        </div>

        {/* Información del Evento */}
        <div style={{ display: 'grid', gap: 'var(--space-md)', marginBottom: 'var(--space-lg)' }}>
          {date && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
              <span style={{ fontSize: '1.5rem' }}>📅</span>
              <div>
                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-tertiary)', margin: 0 }}>
                  Fecha
                </p>
                <p style={{ fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)', margin: 0, color: 'var(--text-dark)' }}>
                  {date}
                </p>
              </div>
            </div>
          )}

          {time && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
              <span style={{ fontSize: '1.5rem' }}>🕐</span>
              <div>
                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-tertiary)', margin: 0 }}>
                  Hora
                </p>
                <p style={{ fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)', margin: 0, color: 'var(--text-dark)' }}>
                  {time}
                </p>
              </div>
            </div>
          )}

          {location && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
              <span style={{ fontSize: '1.5rem' }}>📍</span>
              <div>
                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-tertiary)', margin: 0 }}>
                  Ubicación
                </p>
                <p style={{ fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)', margin: 0, color: 'var(--text-dark)' }}>
                  {location}
                </p>
              </div>
            </div>
          )}

          {distance && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
              <span style={{ fontSize: '1.5rem' }}>🏊</span>
              <div>
                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-tertiary)', margin: 0 }}>
                  Distancia
                </p>
                <p style={{ fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)', margin: 0, color: 'var(--text-dark)' }}>
                  {distance}
                </p>
              </div>
            </div>
          )}

          {category && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
              <span style={{ fontSize: '1.5rem' }}>🎯</span>
              <div>
                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-tertiary)', margin: 0 }}>
                  Categoría
                </p>
                <p style={{ fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)', margin: 0, color: 'var(--text-dark)' }}>
                  {category}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Precio */}
        {price && (
          <div style={{
            backgroundColor: 'rgba(0, 91, 150, 0.08)',
            padding: 'var(--space-md)',
            borderRadius: 'var(--radius-md)',
            marginTop: 'auto',
            marginBottom: 'var(--space-md)',
          }}>
            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-tertiary)', margin: 0 }}>
              Costo de inscripción
            </p>
            <p style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)', margin: 0, color: 'var(--brand-main)' }}>
              {price}
            </p>
          </div>
        )}
      </div>

      {/* Footer - Botones de Acción */}
      {(onRegister || onViewDetails) && (
        <div className="card__footer">
          {onViewDetails && (
            <button
              className="btn btn--secondary btn--lg"
              onClick={onViewDetails}
              style={{ flex: 1 }}
            >
              Ver detalles
            </button>
          )}
          {onRegister && (
            <button
              className="btn btn--action btn--lg"
              onClick={onRegister}
              style={{ flex: 1 }}
            >
              Inscribirse
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default EventCard;
