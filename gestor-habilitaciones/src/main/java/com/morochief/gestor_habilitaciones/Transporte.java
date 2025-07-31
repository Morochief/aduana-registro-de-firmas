package com.morochief.gestor_habilitaciones;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Transporte {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String nombre;
    private String numeroRol;
    private LocalDate fechaVencimiento;
    private LocalDate fechaCreacion;
    
    @Column(columnDefinition = "boolean default false")
    private boolean omitido = false;
    
    // Constructor personalizado sin omitido (mantiene compatibilidad)
    public Transporte(String nombre, String numeroRol, LocalDate fechaVencimiento, LocalDate fechaCreacion) {
        this.nombre = nombre;
        this.numeroRol = numeroRol;
        this.fechaVencimiento = fechaVencimiento;
        this.fechaCreacion = fechaCreacion;
        this.omitido = false;
    }
}