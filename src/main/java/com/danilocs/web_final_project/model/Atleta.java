package com.danilocs.web_final_project.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "ATLETA") 
public class Atleta {

    @Id
    @Column(name = "id_atleta")
    private String numId;

    @Column(name = "nombre_atl")
    private String nombre;

    @Column(name = "apellidos_atl")
    private String apellidos;

    @Column(name = "edad")
    private int edad;

    @Column(name = "sexo")
    private String sexo;

    @Column(name = "contacto")
    private String contacto;

    @Column(name = "categ_deport")
    private String categoria;

    @ManyToOne
    @JoinColumn(name = "id_pais", referencedColumnName = "id_pais")
    private Pais pais;

    public Atleta() {
    }

    public Atleta(String numId, String nombre, String apellidos, int edad, String sexo, String contacto, String categoria, Pais pais) {
        this.numId = numId;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.edad = edad;
        this.sexo = sexo;
        this.contacto = contacto;
        this.categoria = categoria;
        this.pais = pais;
    }


    public String getNumId() {
        return numId;
    }

    public String getNombre() {
        return nombre;
    }

    public String getApellidos() {
        return apellidos;
    }

    public int getEdad() {
        return edad;
    }

    public String getSexo() {
        return sexo;
    }

    public String getContacto() {
        return contacto;
    }

    public String getCategoria() {
        return categoria;
    }

    public Pais getPais() {
        return pais;
    }

    public void setNumId(String numId) {
        this.numId = numId;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    public void setEdad(int edad) {
        this.edad = edad;
    }

    public void setSexo(String sexo) {
        this.sexo = sexo;
    }

    public void setContacto(String contacto) {
        this.contacto = contacto;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public void setPais(Pais pais) {
        this.pais = pais;
    }
    
    
}