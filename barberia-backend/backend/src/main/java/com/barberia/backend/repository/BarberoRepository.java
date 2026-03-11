package com.barberia.backend.repository;

import com.barberia.backend.model.Barbero;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BarberoRepository extends JpaRepository<Barbero, Long> {
    long countByDisponibleTrue();
}
