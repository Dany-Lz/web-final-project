package com.danilocs.web_final_project.exceptions;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Map<String, String>> handleDatabaseErrors(DataIntegrityViolationException ex) {
        Map<String, String> response = new HashMap<>();
        String mensajeLimpio = "Los datos ingresados no cumplen con el formato válido. Revise el campo.";

        // Extraemos la causa más específica (PostgreSQL)
        Throwable cause = ex.getMostSpecificCause();
        if (cause != null && cause.getMessage() != null) {
            String dbMessage = cause.getMessage();
            
            // Limpiamos el mensaje de PostgreSQL
            if (dbMessage.contains("violates check constraint")) {
                if (dbMessage.contains("check_atleta_contacto")) {
                    mensajeLimpio = "El campo de contacto solo debe contener números, guiones, paréntesis o espacios, y tener entre 5 y 20 caracteres.";
                } else if (dbMessage.contains("check_atleta_edad")) {
                    mensajeLimpio = "La edad debe estar entre 0 y 120 años.";
                } else if (dbMessage.contains("check_id_atleta_numeros")) {
                    mensajeLimpio = "El ID del atleta debe contener exactamente 11 dígitos numéricos.";
                } else {
                    mensajeLimpio = "Uno de los datos ingresados no es válido según las reglas de la base de datos.";
                }
            }
        }

        response.put("mensaje", mensajeLimpio);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    // Manejador para cualquier otra excepción (para que nunca se rompa el JSON)
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleGeneralErrors(Exception ex) {
        Map<String, String> response = new HashMap<>();
        response.put("mensaje", "Ocurrió un error inesperado en el servidor.");
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}