package com.morochief.gestor_habilitaciones;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Map;

@RestController
@RequestMapping("/api/transportes")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173", "https://registro-firmas-frontend.onrender.com"})
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
    public ResponseEntity<Transporte> getById(@PathVariable Long id) {
        Optional<Transporte> transporte = service.getById(id);
        if (transporte.isPresent()) {
            return ResponseEntity.ok(transporte.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Crear nuevo transporte
    @PostMapping
    public Transporte create(@RequestBody Transporte t) {
        if (t.getFechaCreacion() == null) {
            t.setFechaCreacion(LocalDate.now());
        }
        // Asegurar que omitido sea false por defecto
        t.setOmitido(false);
        return service.save(t);
    }
    
    // Editar transporte existente
    @PutMapping("/{id}")
    public ResponseEntity<Transporte> update(@PathVariable Long id, @RequestBody Transporte t) {
        Optional<Transporte> existing = service.getById(id);
        if (existing.isPresent()) {
            t.setId(id);
            // Preservar la fecha de creación original
            if (t.getFechaCreacion() == null) {
                t.setFechaCreacion(existing.get().getFechaCreacion());
            }
            return ResponseEntity.ok(service.save(t));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Eliminar transporte
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (service.getById(id).isPresent()) {
            service.delete(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    // ENDPOINT CORREGIDO para cambiar estado omitido
    @PatchMapping("/{id}/omitir")
    public ResponseEntity<Transporte> cambiarEstadoOmitido(@PathVariable Long id, @RequestBody Map<String, Boolean> request) {
        Optional<Transporte> opt = service.getById(id);
        if (opt.isPresent()) {
            Transporte t = opt.get();
            // Obtener el valor de 'omitido' del request body
            Boolean omitido = request.get("omitido");
            if (omitido != null) {
                t.setOmitido(omitido);
                return ResponseEntity.ok(service.save(t));
            } else {
                return ResponseEntity.badRequest().build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Endpoints adicionales (opcionales, pero útiles)
    @PatchMapping("/{id}/omitir-simple")
    public ResponseEntity<Transporte> omitirAlerta(@PathVariable Long id) {
        Optional<Transporte> opt = service.getById(id);
        if (opt.isPresent()) {
            Transporte t = opt.get();
            t.setOmitido(true);
            return ResponseEntity.ok(service.save(t));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PatchMapping("/{id}/reactivar")
    public ResponseEntity<Transporte> reactivarAlerta(@PathVariable Long id) {
        Optional<Transporte> opt = service.getById(id);
        if (opt.isPresent()) {
            Transporte t = opt.get();
            t.setOmitido(false);
            return ResponseEntity.ok(service.save(t));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}