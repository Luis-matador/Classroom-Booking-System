package com.ilerna.classroom_booking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ilerna.classroom_booking.model.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long>{
}
