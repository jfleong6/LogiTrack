package com.logitrack.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.logitrack.service.DashboardService;

import java.util.Map;

@RestController
public class DashboardInfoController {

    private final DashboardService dashboardService;

    public DashboardInfoController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @PostMapping("/api/dashboard-info-bodega")
    public Map<String, Object> getDashboardInfo() {
        return dashboardService.obtenerDashboardInfo();
    }
}
