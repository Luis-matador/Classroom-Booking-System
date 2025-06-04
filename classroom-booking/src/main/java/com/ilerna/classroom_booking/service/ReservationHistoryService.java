package com.ilerna.classroom_booking.service;

import com.ilerna.classroom_booking.model.ReservationHistory;

import java.util.List;
import java.util.Optional;

public interface ReservationHistoryService {
    ReservationHistory saveReservationHistory(ReservationHistory reservationHistory);
    Optional<ReservationHistory> getReservationHistoryById(Long id);
    List<ReservationHistory> getAllReservationHistories();
    ReservationHistory updateReservationHistory(ReservationHistory reservationHistory);
    void deleteReservationHistoryById(Long id);
}
