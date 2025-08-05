package com.hackathon_ai.LibraryManagementBackend.controller;

import com.hackathon_ai.LibraryManagementBackend.Service.PaymentService;
import com.hackathon_ai.LibraryManagementBackend.responseDtos.PaymentReport;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private PaymentService paymentService;

    @GetMapping("/payment-reports")
    public ResponseEntity<List<PaymentReport>> getPaymentReport(){
        return ResponseEntity.status(HttpStatus.OK)
                .body(paymentService.getPaymentReports());
    }
}
