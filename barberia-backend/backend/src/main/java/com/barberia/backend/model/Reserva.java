package com.barberia.backend.model;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Data
public class Reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String clienteNombre;
    private String telefono;
    private LocalDateTime fechaYHora;

    // ¡AQUÍ ESTÁ TU CLAVE FORÁNEA!
    // Le decimos que MUCHAS reservas pueden ser atendidas por UN barbero
    @ManyToOne
    @JoinColumn(name = "barbero_id")// En MySQL se creará una columna llamada 'barbero_id'
    private Barbero barbero;
}