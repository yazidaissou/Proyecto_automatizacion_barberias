'use client';

import { useState } from 'react';
import styles from './contacto.module.css';

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulación de envío (en producción, conectar con API)
      await new Promise(resolve => setTimeout(resolve, 1000));

      setMessage({
        type: 'success',
        text: '¡Mensaje enviado! Te contactaremos pronto.'
      });

      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        asunto: '',
        mensaje: ''
      });

      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Error al enviar el mensaje. Intenta nuevamente.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* Hero */}
      <section className={styles.hero}>
        <h1>Contáctanos</h1>
        <p>Estamos aquí para responder tus preguntas y ayudarte</p>
      </section>

      {/* Contenido */}
      <section className={styles.content}>
        <div className={styles.contentGrid}>
          {/* Información */}
          <div className={styles.infoSection}>
            <h2>Información de Contacto</h2>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>📞</div>
              <div>
                <h3>Teléfono</h3>
                <p>123-456-789</p>
                <p className={styles.subtext}>Lunes a Viernes: 9:00 AM - 6:00 PM</p>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>📧</div>
              <div>
                <h3>Email</h3>
                <p>contacto@barberia.com</p>
                <p className={styles.subtext}>Responderemos en 24 horas</p>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>📍</div>
              <div>
                <h3>Ubicación</h3>
                <p>Calle Principal 123</p>
                <p>Ciudad, Estado</p>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>🕐</div>
              <div>
                <h3>Horario</h3>
                <p>Lun - Vie: 9:00 AM - 8:00 PM</p>
                <p>Sáb: 10:00 AM - 6:00 PM</p>
                <p>Dom: Cerrado</p>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <div className={styles.formSection}>
            <h2>Envíanos un Mensaje</h2>

            {message && (
              <div className={`${styles.message} ${styles[message.type]}`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="nombre">Nombre Completo *</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  placeholder="Tu nombre"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="tu@email.com"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="telefono">Teléfono</label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="123-456-789"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="asunto">Asunto *</label>
                <input
                  type="text"
                  id="asunto"
                  name="asunto"
                  value={formData.asunto}
                  onChange={handleChange}
                  required
                  placeholder="¿En qué podemos ayudarte?"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="mensaje">Mensaje *</label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                  placeholder="Cuéntanos con detalle..."
                  rows="5"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={styles.submitButton}
              >
                {loading ? 'Enviando...' : 'Enviar Mensaje'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Mapa */}
      <section className={styles.mapSection}>
        <h2>Encuéntranos</h2>
        <div className={styles.mapContainer}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d-74.0060!3d40.7128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjEiTiA3NMKwMDAnMjEuNiJX!5e0!3m2!1ses!2sus!4v1234567890"
            width="100%"
            height="400"
            style={{ border: 0, borderRadius: 'var(--radius-xl)' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </div>
  );
}