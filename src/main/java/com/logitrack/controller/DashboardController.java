package com.logitrack.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;   // ← ESTE ES EL BUENO
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.logitrack.model.Usuario;
import com.logitrack.service.UsuarioService;

@RestController
@RequestMapping("/api")
public class DashboardController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/dashboard-data")
    public Map<String, String> dashboardData(Authentication auth) {

        // username que viene del JWT
        String username = auth.getName();

        // buscar usuario en BD
        Usuario usuario = usuarioService.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        return Map.of(
            "nombre", usuario.getNombre(),
            "username", usuario.getUsername(),
            "rol", usuario.getRol()
        );
    }
}
