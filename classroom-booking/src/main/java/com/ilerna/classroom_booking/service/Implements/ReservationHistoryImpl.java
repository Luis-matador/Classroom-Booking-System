package com.ilerna.classroom_booking.service.Implements;

import com.ilerna.classroom_booking.model.ReservationHistory;
import com.ilerna.classroom_booking.service.ReservationHistoryService;

import java.util.List;

public class ReservationHistoryImpl implements ReservationHistoryService {
    @Override
    public ReservationHistoryService saveReservationHistory(ReservationHistory reservationHistory) {
        return null;
    }

    @Override
    public ReservationHistory getReservationHistoryById(Long id) {
        return null;
    }

    @Override
    public List<ReservationHistory> getAllReservationHistories() {
        return List.of();
    }

    @Override
    public ReservationHistory updateReservationHistory(ReservationHistory reservationHistory) {
        return null;
    }

    @Override
    public void deleteReservationHistoryById(Long id) {

    }
}
