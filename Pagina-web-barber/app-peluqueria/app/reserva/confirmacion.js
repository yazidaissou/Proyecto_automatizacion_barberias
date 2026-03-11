'use client';

import styles from './confirmacion.module.css';
import Link from 'next/link';

export default function ConfirmacionReserva({ reserva, onNuevaReserva }) {
  if (!reserva) {
    return null;
  }

  const formatearFecha = (fecha) => {
    const date = new Date(fecha + 'T00:00:00');
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Check animado */}
        <div className={styles.successIcon}>
          <div className={styles.checkmark}></div>
        </div>

        {/* Título */}
        <h1 className={styles.title}>¡Reserva Confirmada!</h1>
        <p className={styles.subtitle}>
          Tu cita ha sido registrada correctamente
        </p>

        {/* Datos de la Reserva */}
        <div className={styles.reservaCard}>
          <div className={styles.reservaHeader}>
            <h2>Detalles de tu Cita</h2>
          </div>

          <div className={styles.reservaGrid}>
            {/* Barbero */}
            <div className={styles.reservaItem}>
              <span className={styles.label}>Barbero</span>
              <span className={styles.value}>{reserva.barbero}</span>
              <span className={styles.especialidad}>{reserva.especialidad}</span>
            </div>

            {/* Servicio */}
            <div className={styles.reservaItem}>
              <span className={styles.label}>Servicio</span>
              <span className={styles.value}>{reserva.servicio}</span>
              <span className={styles.duracion}>{reserva.duracion} minutos</span>
            </div>

            {/* Fecha */}
            <div className={styles.reservaItem}>
              <span className={styles.label}>Fecha</span>
              <span className={styles.value}>
                {formatearFecha(reserva.fecha)}
              </span>
            </div>

            {/* Hora */}
            <div className={styles.reservaItem}>
              <span className={styles.label}>Hora</span>
              <span className={styles.value}>{reserva.hora}</span>
            </div>

            {/* Precio */}
            <div className={styles.reservaItem}>
              <span className={styles.label}>Precio</span>
              <span className={styles.price}>${reserva.precio}</span>
            </div>

            {/* Duración total */}
            <div className={styles.reservaItem}>
              <span className={styles.label}>Duración</span>
              <span className={styles.value}>{reserva.duracion} min</span>
            </div>
          </div>

          {/* Datos del Cliente */}
          <div className={styles.clienteSection}>
            <h3>Datos del Cliente</h3>
            <div className={styles.clienteGrid}>
              <div className={styles.clienteItem}>
                <span className={styles.label}>Nombre</span>
                <span className={styles.value}>{reserva.cliente.nombre}</span>
              </div>
              <div className={styles.clienteItem}>
                <span className={styles.label}>Email</span>
                <span className={styles.value}>{reserva.cliente.email}</span>
              </div>
              <div className={styles.clienteItem}>
                <span className={styles.label}>Teléfono</span>
                <span className={styles.value}>{reserva.cliente.telefono}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mensaje de bienvenida */}
        <div className={styles.welcomeMessage}>
          <p className={styles.welcomeText}>
            ¡Te esperamos el <strong>{formatearFecha(reserva.fecha)}</strong> a las <strong>{reserva.hora}</strong> en nuestra barbería!
          </p>
          <p className={styles.additionalInfo}>
            Se ha enviado una confirmación a tu email. Si necesitas cambiar tu cita, contacta con nosotros al menos 24 horas antes.
          </p>
        </div>

        {/* Botones */}
        <div className={styles.buttons}>
          <button
            onClick={onNuevaReserva}
            className={styles.btnNewReserva}
          >
            ← Hacer otra Reserva
          </button>
          <Link href="/" className={styles.btnHome}>
            Volver al Inicio →
          </Link>
        </div>
      </div>

      {/* Elementos decorativos */}
      <div className={styles.decoration}></div>
    </div>
  );
}