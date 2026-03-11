package com.barberia.backend.controller;

import com.barberia.backend.model.Barbero;
import com.barberia.backend.model.Reserva;
import com.barberia.backend.repository.BarberoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/barberos")
@CrossOrigin(origins = "http://localhost:3000")
public class BarberoController {
    @Autowired
    private BarberoRepository barberoRepository;

    @GetMapping("/disponibles")
    public List<Barbero> obtenerBarberosDisponibles(
            @RequestParam String fecha,
            @RequestParam String hora,
            @RequestParam(required = false) Long servicioId) {

        // --- SOLUCIÓN ELEGANTE Y A PRUEBA DE FALLOS ---


        LocalDate diaParseado = LocalDate.parse(fecha);
        LocalTime horaParseada = LocalTime.parse(hora); // Entiende tanto "20:00" como "20:00:00"
        LocalDateTime fechaYHoraBuscada = LocalDateTime.of(diaParseado, horaParseada);
        // ----------------------------------------------

        List<Barbero> todosLosBarberos = barberoRepository.findAll();
        List<Barbero> barberosLibres = new ArrayList<>();

        for (Barbero barbero : todosLosBarberos) {
            if (barbero.isDisponible()) {
                boolean ocupado = false;
                for (Reserva reserva : barbero.getReservas()) {
                    if (reserva.getFechaYHora().equals(fechaYHoraBuscada)) {
                        ocupado = true;
                        break;
                    }
                }
                if (!ocupado) {
                    barberosLibres.add(barbero);
                }
            }
        }
        return barberosLibres;
    }
    @PostMapping
    public Barbero nuevoBarbero(@RequestBody Barbero barbero) {
        return barberoRepository.save(barbero);
    }
    @GetMapping
    public List<Barbero> listadoBarberos() {return barberoRepository.findAll();}

}
