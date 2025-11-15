package com.logitrack.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.logitrack.service.ProductoBodegaService;

@RestController
@RequestMapping("/api")
public class ProductoBodegaController {

    @Autowired
    private ProductoBodegaService service;

    @PostMapping("/bodega/{id}/productos")
    public ResponseEntity<?> productosPorBodega(@PathVariable Long id) {
        return ResponseEntity.ok(service.obtenerProductosPorBodega(id));
    }
}