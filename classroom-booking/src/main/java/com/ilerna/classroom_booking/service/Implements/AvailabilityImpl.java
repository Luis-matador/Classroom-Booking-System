package com.ilerna.classroom_booking.service.Implements;

import com.ilerna.classroom_booking.model.Availability;
import com.ilerna.classroom_booking.service.AvailabilityService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AvailabilityImpl implements AvailabilityService {
    @Override
    public Availability saveAvailability(Availability availability) {
        return null;
    }

    @Override
    public Optional<Availability> getAvailabilityById(Long id) {
        return Optional.empty();
    }

    @Override
    public List<Availability> getAllAvailabilities() {
        return List.of();
    }

    @Override
    public Availability updateAvailability(Availability availability) {
        return null;
    }

    @Override
    public void deleteAvailabilityById(Long id) {

    }
}
