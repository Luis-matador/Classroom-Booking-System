package com.ilerna.classroom_booking.service.Implements;

import com.ilerna.classroom_booking.model.ReservationHistory;
import com.ilerna.classroom_booking.repository.ReservationHistoryRepository;
import com.ilerna.classroom_booking.service.ReservationHistoryService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReservationHistoryImpl implements ReservationHistoryService {

    private final ReservationHistoryRepository reservationHistoryRepository;

    public ReservationHistoryImpl(ReservationHistoryRepository reservationHistoryRepository) {
        this.reservationHistoryRepository = reservationHistoryRepository;
    }

    @Override
    public ReservationHistory saveReservationHistory(ReservationHistory reservationHistory) {
        return null;
    }

    @Override
    public Optional<ReservationHistory> getReservationHistoryById(Long id) {
        return Optional.empty();
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
