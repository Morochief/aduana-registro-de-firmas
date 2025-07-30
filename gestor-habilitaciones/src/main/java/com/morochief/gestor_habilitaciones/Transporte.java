package com.morochief.gestor_habilitaciones;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Transporte {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String numeroRol;
    private LocalDate fechaVencimiento;
    private LocalDate fechaCreacion;

    private boolean omitido = false; // <--- NUEVO CAMPO

    public Transporte() {}

    public Transporte(String nombre, String numeroRol, LocalDate fechaVencimiento, LocalDate fechaCreacion) {
        this.nombre = nombre;
        this.numeroRol = numeroRol;
        this.fechaVencimiento = fechaVencimiento;
        this.fechaCreacion = fechaCreacion;
        this.omitido = false; // por defecto no omitido
    }

    public Transporte(String nombre, String numeroRol, LocalDate fechaVencimiento, LocalDate fechaCreacion, boolean omitido) {
        this.nombre = nombre;
        this.numeroRol = numeroRol;
        this.fechaVencimiento = fechaVencimiento;
        this.fechaCreacion = fechaCreacion;
        this.omitido = omitido;
    }

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getNumeroRol() { return numeroRol; }
    public void setNumeroRol(String numeroRol) { this.numeroRol = numeroRol; }

    public LocalDate getFechaVencimiento() { return fechaVencimiento; }
    public void setFechaVencimiento(LocalDate fechaVencimiento) { this.fechaVencimiento = fechaVencimiento; }

    public LocalDate getFechaCreacion() { return fechaCreacion; }
    public void setFechaCreacion(LocalDate fechaCreacion) { this.fechaCreacion = fechaCreacion; }

    public boolean isOmitido() { return omitido; }
    public void setOmitido(boolean omitido) { this.omitido = omitido; }
}
