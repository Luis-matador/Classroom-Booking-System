package com.ilerna.classroom_booking.service.Implements;

import com.ilerna.classroom_booking.model.Availability;
import com.ilerna.classroom_booking.repository.AvailabilityRepository;
import com.ilerna.classroom_booking.service.AvailabilityService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AvailabilityImpl implements AvailabilityService {

    private final AvailabilityRepository availabilityRepository;
    public AvailabilityImpl(AvailabilityRepository availabilityRepository) {
        this.availabilityRepository = availabilityRepository;
    }

    @Transactional
    @Override
    public Availability saveAvailability(Availability availability) {

        if (availability.getDayOfWeek() == null || availability.getDayOfWeek().trim().isEmpty()) {
            throw new IllegalArgumentException("El día de la semana no puede estar vacío");
        }

        if (availability.getStartTime() == null || availability.getStartTime().trim().isEmpty()) {
            throw new IllegalArgumentException("La hora de inicio no puede estar vacía");
        }

        if (availability.getEndTime() == null || availability.getEndTime().trim().isEmpty()) {
            throw new IllegalArgumentException("La hora de fin no puede estar vacía");
        }

        if (availability.getClassroom() == null || availability.getClassroom().getId() == null) {
            throw new IllegalArgumentException("La clase no puede estar vacía");
        }
    
        return availabilityRepository.save(availability);
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
