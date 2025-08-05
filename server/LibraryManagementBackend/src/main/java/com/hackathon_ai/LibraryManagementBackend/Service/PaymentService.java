package com.hackathon_ai.LibraryManagementBackend.Service;

import com.hackathon_ai.LibraryManagementBackend.responseDtos.PaymentReport;

import java.util.List;

public interface PaymentService {
    List<PaymentReport> getPaymentReports();
}
