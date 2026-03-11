'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link href="/" className={styles.logo}>
          ✂️ Barbería Premium
        </Link>

        <button
          className={`${styles.hamburger} ${isOpen ? styles.active : ''}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`${styles.navMenu} ${isOpen ? styles.active : ''}`}>
          <li>
            <Link href="/" onClick={() => setIsOpen(false)}>
              Inicio
            </Link>
          </li>
          <li>
            <Link href="/servicios" onClick={() => setIsOpen(false)}>
              Servicios
            </Link>
          </li>
          <li>
            <Link href="/reserva" className={styles.navReserva} onClick={() => setIsOpen(false)}>
              Reservar
            </Link>
          </li>
          <li>
            <Link href="/contacto" onClick={() => setIsOpen(false)}>
              Contacto
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}