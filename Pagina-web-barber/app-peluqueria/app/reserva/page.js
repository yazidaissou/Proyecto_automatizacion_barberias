'use client';

import React, { useState, useEffect } from 'react';
import styles from './reserva.module.css';
import Calendar from '../components/Calendar';
import ConfirmacionReserva from './confirmacion';

const RETRY_ATTEMPTS = 2;
const RETRY_DELAY = 500;

export default function ReservaPage() {
  const [servicios, setServicios] = useState([]);
  const [barberos, setBarberos] = useState([]);
  const [horasDisponibles, setHorasDisponibles] = useState([]);

  const [selectedServicio, setSelectedServicio] = useState('');
  const [selectedBarbero, setSelectedBarbero] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHora, setSelectedHora] = useState('');

  const [loading, setLoading] = useState(false);
  const [loadingServicios, setLoadingServicios] = useState(true);
  const [loadingBarberos, setLoadingBarberos] = useState(true);
  const [loadingHoras, setLoadingHoras] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [cliente, setCliente] = useState({
    nombre: '',
    email: '',
    telefono: ''
  });

  const [step, setStep] = useState(1);
  const [reservaCompletada, setReservaCompletada] = useState(null);

  // Cargar servicios al iniciar
  useEffect(() => {
    cargarServicios();
  }, []);

  // Cargar horas cuando se selecciona servicio y fecha
  useEffect(() => {
    if (selectedDate && selectedServicio) {
      obtenerHorasDisponibles();
    }
  }, [selectedDate, selectedServicio]);

  // Cargar barberos disponibles cuando se selecciona hora
  useEffect(() => {
    if (selectedDate && selectedServicio && selectedHora) {
      cargarBarberosDisponibles();
    }
  }, [selectedDate, selectedServicio, selectedHora]);

  const cargarServicios = async (intento = 0) => {
    try {
      setLoadingServicios(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/servicios`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error('Formato de respuesta inválido');
      }

      setServicios(data);
    } catch (err) {
      console.error('Error al cargar servicios:', err);
      if (intento < RETRY_ATTEMPTS) {
        setTimeout(() => cargarServicios(intento + 1), RETRY_DELAY);
      } else {
        setError('No se pudieron cargar los servicios. Por favor, recarga la página.');
      }
    } finally {
      setLoadingServicios(false);
    }
  };

  const cargarBarberosDisponibles = async (intento = 0) => {
    try {
      setLoadingBarberos(true);
      const fechaFormato = selectedDate.toISOString().split('T')[0];
      
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/barberos/disponibles?fecha=${fechaFormato}&hora=${selectedHora}&servicioId=${selectedServicio}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        }
      );

      if (!response.ok) {
        if (response.status === 404) {
          setBarberos([]);
          return;
        }
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        setBarberos(data);
      } else {
        setBarberos([]);
      }
    } catch (err) {
      console.error('Error al obtener barberos disponibles:', err);
      if (intento < RETRY_ATTEMPTS) {
        setTimeout(() => cargarBarberosDisponibles(intento + 1), RETRY_DELAY);
      } else {
        setError('No se pudieron cargar los barberos disponibles. Intenta otra fecha/hora.');
        setBarberos([]);
      }
    } finally {
      setLoadingBarberos(false);
    }
  };

  const obtenerHorasDisponibles = async (intento = 0) => {
    try {
      setLoadingHoras(true);
      setError('');
      setSelectedHora('');
      setHorasDisponibles([]);

      const fechaFormato = selectedDate.toISOString().split('T')[0];
      
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/reservas/disponibles?fecha=${fechaFormato}&barberoId=${selectedBarbero}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        }
      );

      if (!response.ok) {
        if (response.status === 404) {
          setHorasDisponibles([]);
          return;
        }
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        const horasLimpias = data.map(hora => hora.substring(0, 5));
        
        setHorasDisponibles(horasLimpias);
      } else {
        setHorasDisponibles([]);
      }
    } catch (err) {
      console.error('Error al obtener horas:', err);
      if (intento < RETRY_ATTEMPTS) {
        setTimeout(() => obtenerHorasDisponibles(intento + 1), RETRY_DELAY);
      } else {
        setError('No se pudieron cargar las horas disponibles. Intenta otra fecha.');
        setHorasDisponibles([]);
      }
    } finally {
      setLoadingHoras(false);
    }
  };

  const handleClienteChange = (e) => {
    const { name, value } = e.target;
    setCliente(prev => ({ ...prev, [name]: value }));
  };

  // Validar email
  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Validar teléfono
  const validarTelefono = (telefono) => {
    const regex = /^[\d\s\-\+\(\)]{7,}$/;
    return regex.test(telefono);
  };

  const handleReservar = async (e) => {
    e.preventDefault();

    
    // Validaciones
    if (!selectedDate) {
      setError('Por favor selecciona una fecha');
      return;
    }

    if (!selectedServicio) {
      setError('Por favor selecciona un servicio');
      return;
    }

    if (!selectedBarbero) {
      setError('Por favor selecciona un barbero');
      return;
    }

    if (!selectedHora) {
      setError('Por favor selecciona una hora');
      return;
    }

    if (!cliente.nombre || cliente.nombre.trim().length < 3) {
      setError('Por favor ingresa un nombre válido (mínimo 3 caracteres)');
      return;
    }

    if (!validarEmail(cliente.email)) {
      setError('Por favor ingresa un email válido');
      return;
    }

    if (!validarTelefono(cliente.telefono)) {
      setError('Por favor ingresa un teléfono válido');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccess('');

      // 1. Unimos la fecha y la hora de forma inteligente
      const fechaFormato = selectedDate.toISOString().split('T')[0];
      
      // Si la hora ya trae segundos (mide 8 letras, ej: "10:30:00"), la dejamos igual.
      // Si no trae segundos (mide 5 letras, ej: "10:30"), le ponemos el ":00".
      const horaLimpia = selectedHora.length > 5 ? selectedHora : `${selectedHora}:00`;
      
      const fechaYHoraUnida = `${fechaFormato}T${horaLimpia}`;

      // 2. Preparamos el paquete
      const datosReserva = {
        clienteNombre: cliente.nombre.trim(),
        telefono: cliente.telefono.trim(),
        fechaYHora: fechaYHoraUnida,
        barbero: { 
            id: parseInt(selectedBarbero) 
        }
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reservas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosReserva)
      });

      const responseData = await response.json();

      if (!response.ok) {
        const mensajeError = responseData?.error || 
                             responseData?.message ||
                             'Error al guardar la reserva';
        throw new Error(mensajeError);
      }

      // Éxito - Guardar datos de la reserva
      const datosConfirmacion = {
        barbero: barberoSeleccionado.nombre,
        especialidad: barberoSeleccionado.especialidad,
        servicio: servicioSeleccionado.nombre,
        precio: servicioSeleccionado.precio,
        duracion: servicioSeleccionado.duracionMinutos || 30,
        fecha: fechaFormato,
        hora: selectedHora,
        cliente: {
          nombre: cliente.nombre.trim(),
          email: cliente.email.trim(),
          telefono: cliente.telefono.trim()
        }
      };

      setReservaCompletada(datosConfirmacion);
      setSuccess('');
      setError('');
    } catch (err) {
      console.error('Error en la reserva:', err);
      
      const mensajeError = 
        err.message === 'Failed to fetch'
          ? 'No se pudo conectar con el servidor. Verifica tu conexión.'
          : err.message.includes('barber')
          ? 'El barbero no está disponible para esa fecha/hora.'
          : err.message.includes('servi')
          ? 'El servicio no está disponible.'
          : err.message;

      setError(`✕ ${mensajeError}`);
    } finally {
      setLoading(false);
    }
  };

  const handleNuevaReserva = () => {
    setReservaCompletada(null);
    setSelectedServicio('');
    setSelectedBarbero('');
    setSelectedDate(null);
    setSelectedHora('');
    setCliente({ nombre: '', email: '', telefono: '' });
    setHorasDisponibles([]);
    setStep(1);
    setSuccess('');
    setError('');
  };

  // Buscar servicios y barberos seleccionados
  const servicioSeleccionado = servicios.find(s => s.id === parseInt(selectedServicio));
  const barberoSeleccionado = barberos.find(b => b.id === parseInt(selectedBarbero));

  // Si la reserva está completada, mostrar confirmación
  if (reservaCompletada) {
    return <ConfirmacionReserva reserva={reservaCompletada} onNuevaReserva={handleNuevaReserva} />;
  }

  return (
    <div className={styles.container}>
      {/* Hero */}
      <section className={styles.hero}>
        <h1>Reserva tu Cita</h1>
        <p>Selecciona tu servicio, barbero y horario disponible</p>
      </section>

      {/* Formulario */}
      <section className={styles.formSection}>
        <div className={styles.formContainer}>
          <form onSubmit={handleReservar} className={styles.form}>
            {/* Mensajes */}
            {success && (
              <div className={`${styles.message} ${styles.success}`}>
                <span className={styles.icon}>✓</span>
                <div>{success}</div>
              </div>
            )}

            {error && (
              <div className={`${styles.message} ${styles.error}`}>
                <span className={styles.icon}>✕</span>
                <div>{error}</div>
              </div>
            )}

            {/* Indicador de pasos */}
            <div className={styles.stepIndicator}>
              <div className={`${styles.stepDot} ${step >= 1 ? styles.active : ''}`}>
                <span>1</span>
              </div>
              <div className={`${styles.stepLine} ${step >= 2 ? styles.active : ''}`}></div>
              <div className={`${styles.stepDot} ${step >= 2 ? styles.active : ''}`}>
                <span>2</span>
              </div>
              <div className={`${styles.stepLine} ${step >= 3 ? styles.active : ''}`}></div>
              <div className={`${styles.stepDot} ${step >= 3 ? styles.active : ''}`}>
                <span>3</span>
              </div>
            </div>

            {/* PASO 1: Servicio y Barbero */}
            {step === 1 && (
              <div className={styles.step}>
                <h2>Paso 1: Selecciona tu Servicio</h2>

                {loadingServicios ? (
                  <div className={styles.loading}>
                    <div className={styles.spinner}></div>
                    <p>Cargando servicios...</p>
                  </div>
                ) : (
                  <div className={styles.optionsList}>
                    {servicios.length > 0 ? (
                      servicios.map(servicio => (
                        <div
                          key={servicio.id}
                          className={`${styles.option} ${selectedServicio == servicio.id ? styles.selected : ''}`}
                          onClick={() => setSelectedServicio(servicio.id)}
                          role="button"
                          tabIndex="0"
                        >
                          <div className={styles.optionHeader}>
                            <span className={styles.optionTitle}>{servicio.nombre}</span>
                            <span className={styles.optionPrice}>${servicio.precio}</span>
                          </div>
                          <small className={styles.optionDesc}>{servicio.descripcion}</small>
                          <small className={styles.optionDuration}>
                            ⏱️ {servicio.duracionMinutos || 30} min
                          </small>
                        </div>
                      ))
                    ) : (
                      <p>No hay servicios disponibles</p>
                    )}
                  </div>
                )}

                {selectedServicio && (
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className={styles.btnNext}
                  >
                    Continuar →
                  </button>
                )}
              </div>
            )}

            {/* PASO 2: Calendario y Horas */}
            {step === 2 && selectedServicio && (
              <div className={styles.step}>
                <h2>Paso 2: Selecciona Fecha y Hora</h2>

                <div className={styles.calendarSection}>
                  <div className={styles.calendarContainer}>
                    <Calendar
                      onDateSelect={setSelectedDate}
                      selectedDate={selectedDate}
                    />
                  </div>

                  {/* Horas Disponibles */}
                  <div className={styles.horasSection}>
                    {selectedDate && (
                      <>
                        <h3>
                          Horas disponibles para {selectedDate.toLocaleDateString('es-ES', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </h3>

                        {loadingHoras && (
                          <div className={styles.loading}>
                            <div className={styles.spinner}></div>
                            <p>Cargando horas disponibles...</p>
                          </div>
                        )}

                        {!loadingHoras && horasDisponibles.length > 0 && (
                          <div className={styles.horasGrid}>
                            {horasDisponibles.map((hora) => (
                              <button
                                key={hora}
                                type="button"
                                onClick={() => setSelectedHora(hora)}
                                className={`${styles.horaButton} ${selectedHora === hora ? styles.selected : ''}`}
                              >
                                {hora}
                              </button>
                            ))}
                          </div>
                        )}

                        {!loadingHoras && horasDisponibles.length === 0 && (
                          <div className={styles.noHoras}>
                            <p>❌ No hay horas disponibles para esta fecha</p>
                            <small>Intenta seleccionar otro día</small>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>

                <div className={styles.stepButtons}>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className={styles.btnBack}
                  >
                    ← Atrás
                  </button>
                  {selectedHora && (
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className={styles.btnNext}
                    >
                      Continuar →
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* PASO 3: Datos del Cliente */}
            {step === 3 && selectedServicio && selectedDate && selectedHora && (
              <div className={styles.step}>
                <h2>Paso 3: Elige tu Barbero y Completa tus Datos</h2>

                {/* Barberos Disponibles */}
                <div className={styles.barberosSection}>
                  <h3>Barberos Disponibles a las {selectedHora}</h3>
                  
                  {loadingBarberos ? (
                    <div className={styles.loading}>
                      <div className={styles.spinner}></div>
                      <p>Cargando barberos disponibles...</p>
                    </div>
                  ) : (
                    <div className={styles.barberosGrid}>
                      {barberos.length > 0 ? (
                        barberos.map(barbero => (
                          <div
                            key={barbero.id}
                            className={`${styles.option} ${selectedBarbero == barbero.id ? styles.selected : ''}`}
                            onClick={() => setSelectedBarbero(barbero.id)}
                            role="button"
                            tabIndex="0"
                          >
                            <div className={styles.optionHeader}>
                              <span className={styles.optionTitle}>{barbero.nombre}</span>
                            </div>
                            <small className={styles.optionDesc}>{barbero.especialidad}</small>
                          </div>
                        ))
                      ) : (
                        <div className={styles.noHoras}>
                          <p>❌ No hay barberos disponibles para esta fecha y hora</p>
                          <small>Intenta seleccionar otro horario</small>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Datos del Cliente */}
                {selectedBarbero && (
                  <>
                    <div className={styles.formGrid}>
                      <div className={styles.formGroup}>
                        <label htmlFor="nombre">Nombre Completo *</label>
                        <input
                          type="text"
                          id="nombre"
                          name="nombre"
                          value={cliente.nombre}
                          onChange={handleClienteChange}
                          placeholder="Juan García López"
                          required
                          minLength="3"
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label htmlFor="email">Email *</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={cliente.email}
                          onChange={handleClienteChange}
                          placeholder="tu@email.com"
                          required
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label htmlFor="telefono">Teléfono *</label>
                        <input
                          type="tel"
                          id="telefono"
                          name="telefono"
                          value={cliente.telefono}
                          onChange={handleClienteChange}
                          placeholder="123-456-789"
                          required
                        />
                      </div>
                    </div>

                    {/* Resumen de la Reserva */}
                    {servicioSeleccionado && barberoSeleccionado && (
                      <div className={styles.resumen}>
                        <h3>📋 Resumen de tu Reserva</h3>
                        <div className={styles.resumenGrid}>
                          <div className={styles.resumenItem}>
                            <span className={styles.resumenLabel}>Servicio</span>
                            <span className={styles.resumenValue}>{servicioSeleccionado.nombre}</span>
                          </div>
                          <div className={styles.resumenItem}>
                            <span className={styles.resumenLabel}>Barbero</span>
                            <span className={styles.resumenValue}>{barberoSeleccionado.nombre}</span>
                          </div>
                          <div className={styles.resumenItem}>
                            <span className={styles.resumenLabel}>Fecha</span>
                            <span className={styles.resumenValue}>
                              {selectedDate.toLocaleDateString('es-ES')}
                            </span>
                          </div>
                          <div className={styles.resumenItem}>
                            <span className={styles.resumenLabel}>Hora</span>
                            <span className={styles.resumenValue}>{selectedHora}</span>
                          </div>
                          <div className={styles.resumenItem}>
                            <span className={styles.resumenLabel}>Duración</span>
                            <span className={styles.resumenValue}>
                              {servicioSeleccionado.duracionMinutos || 30} min
                            </span>
                          </div>
                          <div className={styles.resumenItem}>
                            <span className={styles.resumenLabel}>Precio</span>
                            <span className={styles.resumenValue}>${servicioSeleccionado.precio}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Botones de Acción */}
                    <div className={styles.stepButtons}>
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className={styles.btnBack}
                      >
                        ← Atrás
                      </button>
                      <button
                        type="submit"
                        disabled={loading || !cliente.nombre || !cliente.email || !cliente.telefono}
                        className={styles.btnSubmit}
                      >
                        {loading ? '⏳ Confirmando Reserva...' : '✓ Confirmar Reserva'}
                      </button>
                    </div>
                  </>
                )}

                {!selectedBarbero && barberos.length > 0 && (
                  <div className={styles.stepButtons}>
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className={styles.btnBack}
                    >
                      ← Atrás
                    </button>
                  </div>
                )}
              </div>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}