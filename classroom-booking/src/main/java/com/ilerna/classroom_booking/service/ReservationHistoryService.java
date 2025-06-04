package com.ilerna.classroom_booking.service;

import com.ilerna.classroom_booking.model.ReservationHistory;

import java.util.List;

public interface ReservationHistoryService {
    ReservationHistoryService saveReservationHistory(ReservationHistory reservationHistory);
    ReservationHistory getReservationHistoryById(Long id);
    List<ReservationHistory> getAllReservationHistories();
    ReservationHistory updateReservationHistory(ReservationHistory reservationHistory);
    void deleteReservationHistoryById(Long id);
}
