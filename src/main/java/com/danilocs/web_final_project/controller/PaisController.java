package com.danilocs.web_final_project.controller;

import com.danilocs.web_final_project.model.Pais;
import com.danilocs.web_final_project.repository.PaisRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/paises")
public class PaisController {

    @Autowired
    private PaisRepository paisRepository;

    @GetMapping
    public List<Pais> listarPaises() {
        return paisRepository.findAll();
    }
}