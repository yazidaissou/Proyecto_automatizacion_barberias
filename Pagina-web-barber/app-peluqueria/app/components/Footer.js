import styles from './Footer.module.css';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3>Barbería Premium</h3>
          <p>Tu destino para cortes de cabello y servicios de barbería de clase mundial.</p>
        </div>

        <div className={styles.footerSection}>
          <h3>Enlaces Rápidos</h3>
          <ul>
            <li><Link href="/">Inicio</Link></li>
            <li><Link href="/servicios">Servicios</Link></li>
            <li><Link href="/reserva">Reservar</Link></li>
            <li><Link href="/contacto">Contacto</Link></li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h3>Contacto</h3>
          <p>📞 123-456-789</p>
          <p>📧 contacto@barberia.com</p>
          <p>📍 Calle Principal 123, Ciudad</p>
        </div>

        <div className={styles.footerSection}>
          <h3>Síguenos</h3>
          <div className={styles.socialLinks}>
            <a href="#" title="Facebook">f</a>
            <a href="#" title="Instagram">📷</a>
            <a href="#" title="Twitter">𝕏</a>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>&copy; {currentYear} Barbería Premium. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}