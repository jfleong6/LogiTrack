package com.logitrack.controller;

import com.logitrack.util.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;

import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public AuthController(AuthenticationConfiguration configuration, JwtUtil jwtUtil) throws Exception {
        this.authenticationManager = configuration.getAuthenticationManager();
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> request) {

        String username = request.get("username");
        String password = request.get("password");
        System.out.println("hola");

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password));

            System.out.println("hola2");
            String token = jwtUtil.generateToken(username);
            return Map.of("token", token);

        } catch (AuthenticationException e) {
            throw new RuntimeException("Credenciales inválidas");
        }
    }
}
