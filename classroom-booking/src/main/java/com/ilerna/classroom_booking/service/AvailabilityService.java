package com.ilerna.classroom_booking.service;

import java.util.List;
import java.util.Optional;

import com.ilerna.classroom_booking.model.Availability;

public interface AvailabilityService {
    Availability saveAvailability(Availability availability);
    Optional<Availability> getAvailabilityById(Long id);
    List<Availability> getAllAvailabilities();
    Availability updateAvailability(Availability availability);
    void deleteAvailabilityById(Long id);
}
