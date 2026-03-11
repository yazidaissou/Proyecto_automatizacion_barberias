'use client';

import { useState } from 'react';
import styles from './Calendar.module.css';

export default function Calendar({ onDateSelect, selectedDate }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = getFirstDayOfMonth(currentDate);
  const daysArray = [];

  // Agregar días vacíos al principio
  for (let i = 0; i < firstDayOfMonth; i++) {
    daysArray.push(null);
  }

  // Agregar días del mes
  for (let i = 1; i <= daysInMonth; i++) {
    daysArray.push(i);
  }

  const handleDayClick = (day) => {
    if (day !== null) {
      const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      
      // No permitir fechas pasadas
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate >= today) {
        onDateSelect(selectedDate);
      }
    }
  };

  const isDateDisabled = (day) => {
    if (day === null) return true;
    
    const testDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Deshabilitar fechas pasadas y domingos
    return testDate < today || testDate.getDay() === 0;
  };

  const isDateSelected = (day) => {
    if (day === null || !selectedDate) return false;
    
    return (
      day === selectedDate.getDate() &&
      currentDate.getMonth() === selectedDate.getMonth() &&
      currentDate.getFullYear() === selectedDate.getFullYear()
    );
  };

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  return (
    <div className={styles.calendar}>
      {/* Header */}
      <div className={styles.header}>
        <button
          className={styles.navButton}
          onClick={previousMonth}
          title="Mes anterior"
        >
          ←
        </button>
        
        <div className={styles.monthYear}>
          <span className={styles.month}>{monthNames[currentDate.getMonth()]}</span>
          <span className={styles.year}>{currentDate.getFullYear()}</span>
        </div>

        <button
          className={styles.navButton}
          onClick={nextMonth}
          title="Próximo mes"
        >
          →
        </button>
      </div>

      {/* Days of week */}
      <div className={styles.daysOfWeek}>
        {dayNames.map(day => (
          <div key={day} className={styles.dayHeader}>
            {day}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className={styles.daysGrid}>
        {daysArray.map((day, index) => (
          <button
            key={index}
            className={`${styles.day} 
              ${day !== null ? styles.validDay : ''} 
              ${isDateSelected(day) ? styles.selected : ''} 
              ${isDateDisabled(day) ? styles.disabled : ''}`}
            onClick={() => handleDayClick(day)}
            disabled={isDateDisabled(day)}
            title={
              day === null
                ? ''
                : isDateDisabled(day)
                ? day === 0
                  ? 'Cerrado los domingos'
                  : 'Fecha pasada'
                : `${day} de ${monthNames[currentDate.getMonth()]}`
            }
          >
            {day}
          </button>
        ))}
      </div>

      {/* Legend */}
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <div className={`${styles.legendColor} ${styles.available}`}></div>
          <span>Disponible</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendColor} ${styles.selected}`}></div>
          <span>Seleccionado</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendColor} ${styles.disabled}`}></div>
          <span>No disponible</span>
        </div>
      </div>
    </div>
  );
}