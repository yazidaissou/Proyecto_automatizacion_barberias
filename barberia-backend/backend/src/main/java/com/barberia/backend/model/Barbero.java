package com.barberia.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Barbero {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String especialidad;
    private boolean disponible;

    @JsonIgnore
    @OneToMany(mappedBy = "barbero")
    private List<Reserva> reservas;
}
