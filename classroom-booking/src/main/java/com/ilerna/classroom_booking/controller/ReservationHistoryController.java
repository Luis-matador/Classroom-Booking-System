package com.ilerna.classroom_booking.controller;

import com.ilerna.classroom_booking.model.ReservationHistory;
import com.ilerna.classroom_booking.service.ReservationHistoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/reservation-histories")
public class ReservationHistoryController {

    private final ReservationHistoryService reservationHistoryService;

    public ReservationHistoryController(ReservationHistoryService reservationHistoryService) {
        this.reservationHistoryService = reservationHistoryService;
    }

    @PostMapping
    public ResponseEntity<ReservationHistory> saveReservationHistory(
            @RequestBody ReservationHistory reservationHistory
    ) {
        ReservationHistory savedHistory = reservationHistoryService.saveReservationHistory(reservationHistory);
        return ResponseEntity.status(201).body(savedHistory);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReservationHistory> getReservationHistoryById(
            @PathVariable Long id
    ) {
        Optional<ReservationHistory> history = reservationHistoryService.getReservationHistoryById(id);
        return history.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<ReservationHistory>> getAllReservationHistories() {
        List<ReservationHistory> histories = reservationHistoryService.getAllReservationHistories();
        return ResponseEntity.ok(histories);
    }

    @PutMapping
    public ResponseEntity<ReservationHistory> updateReservationHistory(
            @RequestBody ReservationHistory reservationHistory
    ) {
        ReservationHistory updatedHistory = reservationHistoryService.updateReservationHistory(reservationHistory);
        if (updatedHistory == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedHistory);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReservationHistoryById(
            @PathVariable Long id
    ) {
        reservationHistoryService.deleteReservationHistoryById(id);
        return ResponseEntity.noContent().build();
    }
}