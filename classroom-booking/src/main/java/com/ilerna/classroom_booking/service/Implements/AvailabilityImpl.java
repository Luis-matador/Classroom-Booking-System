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
        return Optional.ofNullable(availabilityRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("La disponibilidad con ID " + id + " no existe")));
    }

    @Override
    public List<Availability> getAllAvailabilities() {
        return availabilityRepository.findAll();
    }

    @Transactional
    @Override
    public Availability updateAvailability(Availability availability) {
        if (availability == null || availability.getId() == null) {
            throw new IllegalArgumentException("La disponibilidad o el ID no pueden estar vacíos");
        }
        Availability existingAvailability = availabilityRepository.findById(availability.getId())
                .orElseThrow(() -> new IllegalArgumentException("La disponibilidad con ID " + availability.getId() + " no es posible"));

        existingAvailability.setDayOfWeek(availability.getDayOfWeek());
        existingAvailability.setStartTime(availability.getStartTime());
        existingAvailability.setEndTime(availability.getEndTime());
        existingAvailability.setClassroom(availability.getClassroom());

        return availabilityRepository.save(existingAvailability);
    }

    @Transactional
    @Override
    public void deleteAvailabilityById(Long id) {
        Optional<Availability> availability = getAvailabilityById(id);
        if (availability.isEmpty()) {
            throw new RuntimeException("La disponibilidad con ID " + id + " no existe");
        }
        availabilityRepository.deleteById(id);
    }
}
