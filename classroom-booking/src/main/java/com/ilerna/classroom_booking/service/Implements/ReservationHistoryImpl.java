package com.ilerna.classroom_booking.service.Implements;

import com.ilerna.classroom_booking.model.ReservationHistory;
import com.ilerna.classroom_booking.repository.ReservationHistoryRepository;
import com.ilerna.classroom_booking.service.ReservationHistoryService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ReservationHistoryImpl implements ReservationHistoryService {

    private final ReservationHistoryRepository reservationHistoryRepository;

    public ReservationHistoryImpl(ReservationHistoryRepository reservationHistoryRepository) {
        this.reservationHistoryRepository = reservationHistoryRepository;
    }

    @Override
    @Transactional
    public ReservationHistory saveReservationHistory(ReservationHistory reservationHistory) {
        if (reservationHistory.getBooking() == null || reservationHistory.getBooking().getId() <= 0) {
            throw new IllegalArgumentException("La reserva debe ser especificada");
        }

        if (reservationHistory.getUser() == null || reservationHistory.getUser().getId() <= 0) {
            throw new IllegalArgumentException("El usuario debe ser especificado");
        }

        if (reservationHistory.getState() == null || reservationHistory.getState().trim().isEmpty()) {
            throw new IllegalArgumentException("El estado debe ser especificado");
        }

        if (reservationHistory.getDate() == null) {
            reservationHistory.setDate(LocalDateTime.now());
        }

        return reservationHistoryRepository.save(reservationHistory);
    }

    @Override
    public Optional<ReservationHistory> getReservationHistoryById(Long id) {
        return reservationHistoryRepository.findById(id);
    }

    @Override
    public List<ReservationHistory> getAllReservationHistories() {
        return reservationHistoryRepository.findAll();
    }

    @Override
    @Transactional
    public ReservationHistory updateReservationHistory(ReservationHistory reservationHistory) {
        if (reservationHistory.getId() == null || reservationHistory.getId() <= 0) {
            throw new IllegalArgumentException("El ID del historial debe ser especificado");
        }

        Optional<ReservationHistory> existingHistory = reservationHistoryRepository.findById(reservationHistory.getId());
        if (existingHistory.isEmpty()) {
            throw new IllegalArgumentException("El historial con el ID especificado no existe");
        }

        if (reservationHistory.getBooking() == null || reservationHistory.getBooking().getId() <= 0) {
            throw new IllegalArgumentException("La reserva debe ser especificada");
        }

        if (reservationHistory.getUser() == null || reservationHistory.getUser().getId() <= 0) {
            throw new IllegalArgumentException("El usuario debe ser especificado");
        }

        if (reservationHistory.getState() == null || reservationHistory.getState().trim().isEmpty()) {
            throw new IllegalArgumentException("El estado debe ser especificado");
        }
    
        return reservationHistoryRepository.save(reservationHistory);
    }

    @Override
    @Transactional
    public void deleteReservationHistoryById(Long id) {
        Optional<ReservationHistory> history = reservationHistoryRepository.findById(id);
        if (history.isEmpty()) {throw new IllegalArgumentException("El historial con el ID especificado no existe");
        }
        reservationHistoryRepository.deleteById(id);
    }
}
