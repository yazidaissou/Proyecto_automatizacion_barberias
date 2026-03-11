package com.barberia.backend.controller;

import com.barberia.backend.model.Servicio;
import com.barberia.backend.repository.ServicioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/servicios")
@CrossOrigin(origins = "http://localhost:3000") // ¡Súper importante! Esto deja pasar a Next.js
public class ServicioController {

    @Autowired
    private ServicioRepository servicioRepository;


    @GetMapping
    public List<Servicio> obtenerTodos() {
        return servicioRepository.findAll();

    }
}
