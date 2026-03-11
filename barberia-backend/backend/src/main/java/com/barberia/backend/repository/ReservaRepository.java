package com.barberia.backend.repository;

import com.barberia.backend.model.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Long> {
    List<Reserva> findByFechaYHoraBetween(LocalDateTime inicio, LocalDateTime fin);
}
