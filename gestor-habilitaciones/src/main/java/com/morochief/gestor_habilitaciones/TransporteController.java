package com.morochief.gestor_habilitaciones;

import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/transportes")
@CrossOrigin(origins = "*")
public class TransporteController {

    private final TransporteService service;

    public TransporteController(TransporteService service) {
        this.service = service;
    }

    // Obtener todos los transportes
    @GetMapping
    public List<Transporte> getAll() {
        return service.getAll();
    }

    // Obtener un transporte por ID
    @GetMapping("/{id}")
    public Optional<Transporte> getById(@PathVariable Long id) {
        return service.getById(id);
    }

    // Crear nuevo transporte
    @PostMapping
    public Transporte create(@RequestBody Transporte t) {
        if (t.getFechaCreacion() == null) {
            t.setFechaCreacion(LocalDate.now());
        }
        if (t.isOmitido() == false) {
            t.setOmitido(false);
        }
        return service.save(t);
    }

    // Editar transporte existente
    @PutMapping("/{id}")
    public Transporte update(@PathVariable Long id, @RequestBody Transporte t) {
        t.setId(id);
        return service.save(t);
    }

    // Eliminar transporte
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    // --- NUEVOS ENDPOINTS PARA OMISIÓN DE ALERTA ---

    // Omitir alerta (PATCH: /api/transportes/{id}/omitir)
    @PatchMapping("/{id}/omitir")
    public Transporte omitirAlerta(@PathVariable Long id) {
        Optional<Transporte> opt = service.getById(id);
        if (opt.isPresent()) {
            Transporte t = opt.get();
            t.setOmitido(true);
            return service.save(t);
        } else {
            throw new RuntimeException("Transporte no encontrado");
        }
    }

    // Reactivar alerta (PATCH: /api/transportes/{id}/reactivar)
    @PatchMapping("/{id}/reactivar")
    public Transporte reactivarAlerta(@PathVariable Long id) {
        Optional<Transporte> opt = service.getById(id);
        if (opt.isPresent()) {
            Transporte t = opt.get();
            t.setOmitido(false);
            return service.save(t);
        } else {
            throw new RuntimeException("Transporte no encontrado");
        }
    }
}
