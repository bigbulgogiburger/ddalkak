package com.ddalkak.api.controller;

import com.ddalkak.api.dto.RegionResponse;
import com.ddalkak.api.service.RegionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/regions")
@RequiredArgsConstructor
public class RegionController {

    private final RegionService regionService;

    @GetMapping
    public ResponseEntity<Map<String, List<RegionResponse>>> getRegions() {
        List<RegionResponse> regions = regionService.getAllRegions();
        Map<String, List<RegionResponse>> response = new HashMap<>();
        response.put("regions", regions);
        return ResponseEntity.ok(response);
    }

}
