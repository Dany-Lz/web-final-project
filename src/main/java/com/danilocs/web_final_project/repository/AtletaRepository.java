package com.danilocs.web_final_project.repository;

import com.danilocs.web_final_project.model.Atleta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AtletaRepository extends JpaRepository<Atleta, String> {
    // findAll(), findById(), save(), deleteById() ya están aquí
}