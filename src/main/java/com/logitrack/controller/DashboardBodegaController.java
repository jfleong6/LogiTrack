package com.logitrack.controller;

import com.logitrack.service.BodegaProductoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bodega")
public class DashboardBodegaController {

    private final BodegaProductoService bodegaProductoService;

    public DashboardBodegaController(BodegaProductoService bodegaProductoService) {
        this.bodegaProductoService = bodegaProductoService;
    }

    // API: listar productos por bodega
    @PostMapping("/{id}/producto")
    public List<Map<String, Object>> getProductosPorBodega(@PathVariable int id) {
        return bodegaProductoService.obtenerProductosPorBodega(id);
    }
}
