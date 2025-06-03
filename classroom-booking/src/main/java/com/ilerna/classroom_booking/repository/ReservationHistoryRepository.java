package com.ilerna.classroom_booking.repository;

import com.ilerna.classroom_booking.model.ReservationHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationHistoryRepository extends JpaRepository<ReservationHistory, Long> {
}
