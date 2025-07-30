package com.morochief.gestor_habilitaciones;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class TransporteService {
    private final TransporteRepository repository;

    public TransporteService(TransporteRepository repository) {
        this.repository = repository;
    }

    public List<Transporte> getAll() {
        return repository.findAll();
    }

    public Optional<Transporte> getById(Long id) {
        return repository.findById(id);
    }

    public Transporte save(Transporte t) {
        return repository.save(t);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
