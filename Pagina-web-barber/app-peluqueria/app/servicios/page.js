'use client';

import { useState, useEffect } from 'react';
import styles from './servicios.module.css';
import Link from 'next/link';

export default function Servicios() {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    cargarServicios();
  }, []);

  const cargarServicios = async () => {
    try {
      setLoading(true);
      // Usamos la variable de entorno y la ruta exacta de tu Java
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/servicios`);

      if (!response.ok) throw new Error('Error al cargar los servicios');

      const data = await response.json();
      setServicios(data);
    } catch (err) {
      setError('No pudimos cargar los servicios en este momento. Por favor, intenta más tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      {/* Hero Section Elegante */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.subtitle}>Cuidado personal de élite</span>
          <h1>Nuestros Servicios</h1>
          <div className={styles.separator}></div>
          <p>Descubre nuestra selección de tratamientos diseñados para el caballero moderno. Precisión, técnica y productos de la más alta calidad.</p>
        </div>
      </section>

      {/* Catálogo de Servicios */}
      <section className={styles.servicesSection}>
        <div className={styles.container}>
          {loading && (
            <div className={styles.loadingContainer}>
              <div className={styles.spinner}></div>
              <p>Preparando el catálogo...</p>
            </div>
          )}

          {error && (
            <div className={styles.errorCard}>
              <p>{error}</p>
            </div>
          )}

          {!loading && servicios.length > 0 && (
            <div className={styles.grid}>
              {servicios.map((servicio) => (
                <div key={servicio.id} className={styles.card}>
                  <div className={styles.cardInner}>
                    <div className={styles.cardHeader}>
                      <h3 className={styles.serviceName}>{servicio.nombre}</h3>
                      <span className={styles.price}>{servicio.precio}€</span>
                    </div>
                    <p className={styles.description}>
                      {servicio.descripcion || "Servicio profesional realizado con las mejores herramientas y productos del mercado."}
                    </p>
                    <div className={styles.cardFooter}>
                      <span className={styles.duration}>
                        <i className={styles.icon}>⏱</i> Aprox. 30 min
                      </span>
                      <Link href="/reserva" className={styles.bookLink}>
                        Reservar <span>→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && servicios.length === 0 && !error && (
            <div className={styles.emptyState}>
              <p>Actualmente estamos actualizando nuestra lista de servicios.</p>
            </div>
          )}
        </div>
      </section>

      {/* Sección de Beneficios (Estilo Boutique) */}
      <section className={styles.benefitsSection}>
        <div className={styles.container}>
          <h2 className={styles.benefitsTitle}>La Experiencia Premium</h2>
          <div className={styles.benefitsGrid}>
            <div className={styles.benefitItem}>
              <span className={styles.benefitIcon}>✧</span>
              <h4>Técnica Refinada</h4>
              <p>Maestros barberos en constante formación internacional.</p>
            </div>
            <div className={styles.benefitItem}>
              <span className={styles.benefitIcon}>✧</span>
              <h4>Alta Cosmética</h4>
              <p>Solo utilizamos productos exclusivos y respetuosos con tu piel.</p>
            </div>
            <div className={styles.benefitItem}>
              <span className={styles.benefitIcon}>✧</span>
              <h4>Atmósfera Relax</h4>
              <p>Un espacio diseñado para tu confort y desconexión total.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}