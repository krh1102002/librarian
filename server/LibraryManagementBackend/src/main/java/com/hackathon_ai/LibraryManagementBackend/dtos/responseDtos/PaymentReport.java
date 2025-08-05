package com.hackathon_ai.LibraryManagementBackend.responseDtos;

import lombok.Data;

@Data
public class PaymentReport {
    private Double totalAmount;
    private Long membershipCount;
    private Double membershipAmount;
}
