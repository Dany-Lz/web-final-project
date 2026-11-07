package com.danilocs.web_final_project.controller;

import com.danilocs.web_final_project.model.Atleta;
import com.danilocs.web_final_project.repository.AtletaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/atletas")
public class AtletaController {

    @Autowired
    private AtletaRepository atletaRepository;

    // 1. LEER TODOS (GET)
    @GetMapping
    public List<Atleta> listarAtletas() {
        return atletaRepository.findAll();
    }

    // 2. LEER POR ID (GET)
    @GetMapping("/{id}")
    public ResponseEntity<Atleta> obtenerAtleta(@PathVariable String id) {
        Optional<Atleta> atleta = atletaRepository.findById(id);
        return atleta.map(ResponseEntity::ok)
                     .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 3. CREAR (POST)
    @PostMapping
    public Atleta crearAtleta(@RequestBody Atleta atleta) {
        return atletaRepository.save(atleta);
    }

    // 4. MODIFICAR (PUT)
    @PutMapping("/{id}")
    public ResponseEntity<Atleta> actualizarAtleta(@PathVariable String id, @RequestBody Atleta atletaDetalles) {
        Optional<Atleta> optionalAtleta = atletaRepository.findById(id);
        
        if (optionalAtleta.isPresent()) {
            Atleta atleta = optionalAtleta.get();
            atleta.setNombre(atletaDetalles.getNombre());
            atleta.setApellidos(atletaDetalles.getApellidos());
            atleta.setEdad(atletaDetalles.getEdad());
            atleta.setSexo(atletaDetalles.getSexo());
            atleta.setContacto(atletaDetalles.getContacto());
            atleta.setCategoria(atletaDetalles.getCategoria());
            atleta.setPais(atletaDetalles.getPais());
            
            return ResponseEntity.ok(atletaRepository.save(atleta));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // 5. ELIMINAR (DELETE)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarAtleta(@PathVariable String id) {
        if (atletaRepository.existsById(id)) {
            atletaRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}