package com.ddalkak.api.service;

import com.ddalkak.api.dto.RegionResponse;
import com.ddalkak.api.entity.Region;
import com.ddalkak.api.repository.RegionRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RegionService {

    private final RegionRepository regionRepository;
    private final ObjectMapper objectMapper;

    @Cacheable("regions")
    public List<RegionResponse> getAllRegions() {
        return regionRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    private RegionResponse convertToResponse(Region region) {
        List<String> categories = parseCategories(region.getCategories());

        return RegionResponse.builder()
                .id(region.getId())
                .name(region.getName())
                .latitude(region.getLatitude())
                .longitude(region.getLongitude())
                .categories(categories)
                .placeCount(region.getPlaceCount())
                .build();
    }

    private List<String> parseCategories(String categoriesJson) {
        try {
            if (categoriesJson == null || categoriesJson.isEmpty()) {
                return List.of();
            }
            return objectMapper.readValue(categoriesJson, new TypeReference<>() {});
        } catch (JsonProcessingException e) {
            return List.of();
        }
    }

}
