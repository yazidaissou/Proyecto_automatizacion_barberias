package com.barberia.backend.controller;

import com.barberia.backend.model.Reserva;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import com.barberia.backend.repository.ReservaRepository;
import com.barberia.backend.repository.BarberoRepository;


@RestController
@RequestMapping("/api/reservas")
@CrossOrigin(origins = "http://localhost:3000") // Dejamos pasar a Next.js
public class ReservaController {

    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private BarberoRepository barberoRepository;

    // Para ver todas las reservas (GET)
    @GetMapping
    public List<Reserva> obtenerTodas() {
        return reservaRepository.findAll();
    }

    @GetMapping("/{idReserva}")
    public Reserva obtenerReserva(@PathVariable Long idReserva) {
        return reservaRepository.findById(idReserva).get();
    }
    // Para GUARDAR una reserva nueva desde el formulario (POST)
    @PostMapping
    public Reserva crearReserva(@RequestBody Reserva nuevaReserva) {
        return reservaRepository.save(nuevaReserva);
    }
    @GetMapping("/disponibles")
    public List<LocalTime> obtenerHorasDisponibles(@RequestParam String fecha) {

        LocalDate diaSolicitado = LocalDate.parse(fecha);
        LocalDateTime inicioDia = diaSolicitado.atStartOfDay();
        LocalDateTime finDia = diaSolicitado.atTime(23, 59, 59);

        long totalBarberos = barberoRepository.countByDisponibleTrue();

        if (totalBarberos == 0) {
            return new ArrayList<>();
        }

        List<Reserva> reservasDelDia = reservaRepository.findByFechaYHoraBetween(inicioDia, finDia);
        List<LocalTime> horasLibres = new ArrayList<>();

        // --- TURNO DE MAÑANA (09:00 a 14:00) ---
        LocalTime horaManana = LocalTime.of(9, 0);
        LocalTime finManana = LocalTime.of(14, 0);

        while (horaManana.isBefore(finManana)) {
            int reservasEnEstaHora = 0;
            for (Reserva r : reservasDelDia) {
                if (r.getFechaYHora().toLocalTime().equals(horaManana)) {
                    reservasEnEstaHora++;
                }
            }
            if (reservasEnEstaHora < totalBarberos) {
                horasLibres.add(horaManana);
            }
            horaManana = horaManana.plusMinutes(30);
        }


        LocalTime horaTarde = LocalTime.of(16, 0);
        LocalTime finTarde = LocalTime.of(21, 0);

        while (horaTarde.isBefore(finTarde)) {
            int reservasEnEstaHora = 0;
            for (Reserva r : reservasDelDia) {
                if (r.getFechaYHora().toLocalTime().equals(horaTarde)) {
                    reservasEnEstaHora++;
                }
            }
            if (reservasEnEstaHora < totalBarberos) {
                horasLibres.add(horaTarde);
            }
            horaTarde = horaTarde.plusMinutes(30); // Saltamos de 30 en 30 min
        }

        return horasLibres;
    }
}
