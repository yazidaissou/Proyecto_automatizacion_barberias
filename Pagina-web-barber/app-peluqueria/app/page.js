import styles from './page.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1 className={styles.title}>
              Barbería <span className={styles.highlight}>Premium</span>
            </h1>
            <p className={styles.subtitle}>
              Experiencia de corte de cabello de clase mundial con los mejores profesionales
            </p>
            <div className={styles.heroButtons}>
              <Link href="/reserva" className={styles.btnPrimary}>
                Reservar Cita
              </Link>
              <Link href="/servicios" className={styles.btnSecondary}>
                Ver Servicios
              </Link>
            </div>
          </div>
          <div className={styles.heroImage}>
            <div className={styles.imagePlaceholder}>
              ✂️
            </div>
          </div>
        </div>
      </section>

      {/* Servicios Destacados */}
      <section className={styles.services}>
        <div className={styles.servicesContainer}>
          <h2>Nuestros Servicios</h2>
          <p className={styles.servicesSubtitle}>
            Ofrecemos una variedad de servicios profesionales para cuidar tu imagen
          </p>

          <div className={styles.servicesGrid}>
            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>💇</div>
              <h3>Corte Clásico</h3>
              <p>Corte de cabello tradicional con máquina y tijeras profesionales</p>
              <span className={styles.price}>$25</span>
            </div>

            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>💈</div>
              <h3>Barba Profesional</h3>
              <p>Afeitado profesional con navaja de seguridad y productos premium</p>
              <span className={styles.price}>$20</span>
            </div>

            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>✨</div>
              <h3>Corte + Barba</h3>
              <p>Paquete completo con corte profesional y afeitado artesanal</p>
              <span className={styles.price}>$40</span>
            </div>

            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>🎨</div>
              <h3>Tinte Premium</h3>
              <p>Tinte profesional con productos de calidad y tratamiento incluido</p>
              <span className={styles.price}>$35</span>
            </div>

            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>✂️</div>
              <h3>Degradado Moderno</h3>
              <p>Corte con degradado profesional y efecto moderno garantizado</p>
              <span className={styles.price}>$30</span>
            </div>

            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>👂</div>
              <h3>Limpieza de Oídos</h3>
              <p>Limpieza profesional y segura con técnica experta</p>
              <span className={styles.price}>$10</span>
            </div>
          </div>
        </div>
      </section>

      {/* Por Qué Elegirnos */}
      <section className={styles.whyUs}>
        <h2>¿Por qué elegirnos?</h2>
        <div className={styles.whyUsGrid}>
          <div className={styles.whyUsCard}>
            <h3>Profesionales Certificados</h3>
            <p>Nuestros barberos cuentan con años de experiencia y certificaciones internacionales</p>
          </div>
          <div className={styles.whyUsCard}>
            <h3>Productos Premium</h3>
            <p>Utilizamos solo productos de la más alta calidad en cada servicio</p>
          </div>
          <div className={styles.whyUsCard}>
            <h3>Ambiente Acogedor</h3>
            <p>Disfruta de un espacio moderno, limpio y relajante</p>
          </div>
          <div className={styles.whyUsCard}>
            <h3>Citas Flexibles</h3>
            <p>Reserva tu cita en el horario que mejor se adapte a ti</p>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2>¿Listo para transformar tu look?</h2>
          <p>Agenda tu cita hoy mismo y disfruta de una experiencia de barbería de clase mundial</p>
          <Link href="/reserva" className={styles.btnLarge}>
            Reservar Ahora
          </Link>
        </div>
      </section>
    </div>
  );
}