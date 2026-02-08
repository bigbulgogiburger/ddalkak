package com.ddalkak.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Max;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CourseRequest {

    @NotBlank(message = "Region is required")
    private String region;

    @NotBlank(message = "Date type is required")
    private String dateType;

    @NotNull(message = "Budget is required")
    @Min(value = 50000, message = "Budget must be at least 50,000 KRW")
    @Max(value = 300000, message = "Budget must not exceed 300,000 KRW")
    private Integer budget;

}
