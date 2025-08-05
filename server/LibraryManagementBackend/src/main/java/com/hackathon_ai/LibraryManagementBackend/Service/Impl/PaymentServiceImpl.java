package com.hackathon_ai.LibraryManagementBackend.Service;

import com.hackathon_ai.LibraryManagementBackend.responseDtos.PaymentReport;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class PaymentServiceImpl implements PaymentService {

    @Override
    public List<PaymentReport> getPaymentReports() {


        return List.of();
    }
}
