package com.ilerna.classroom_booking.repository;

import com.ilerna.classroom_booking.model.Availability;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AvailabilityRepository extends JpaRepository <Availability, Long>{
}
