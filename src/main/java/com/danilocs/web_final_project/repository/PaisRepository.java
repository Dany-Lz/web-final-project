package com.danilocs.web_final_project.repository;

import com.danilocs.web_final_project.model.Pais;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaisRepository extends JpaRepository<Pais, String>{
    
}
