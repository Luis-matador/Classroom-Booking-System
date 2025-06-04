package com.ilerna.classroom_booking.service;

import java.util.List;

import com.ilerna.classroom_booking.model.Availability;

public interface AvailabilityService {
    Availability saveAvailability(Availability availability);
    Availability getAvailabilityById(Long id);
    List<Availability> getAllAvailabilities();
    Availability updateAvailability(Availability availability);
    void deleteAvailabilityById(Long id);
}
