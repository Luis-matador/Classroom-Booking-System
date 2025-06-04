package com.ilerna.classroom_booking.service.Implements;

import com.ilerna.classroom_booking.model.Availability;
import com.ilerna.classroom_booking.model.Booking;
import com.ilerna.classroom_booking.service.BookingService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookingImpl implements BookingService {
    private final com.ilerna.classroom_booking.repository.BookingRepository bookingRepository;
    public BookingImpl(com.ilerna.classroom_booking.repository.BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }
    @Transactional
    @Override
    public Booking saveBooking(Booking booking) {
        if (booking.getClassroom() == null || booking.getClassroom().getId() == 0) {
            throw new IllegalArgumentException("El aula debe ser especificada");
        }

        if (booking.getStartDate() == null || booking.getEndDate() == null) {
            throw new IllegalArgumentException("Las fechas de inicio y fin deben ser especificadas");
        }

        if (booking.getStartDate().isAfter(booking.getEndDate())) {
            throw new IllegalArgumentException("La fecha de inicio no puede ser posterior a la fecha de fin");
        }

        boolean isOccupied = getAllBookings().stream()
                .filter(b -> b.getClassroom().getId() == booking.getClassroom().getId())
                .anyMatch(b -> booking.getStartDate().isBefore(b.getEndDate()) && booking.getEndDate().isAfter(b.getStartDate()));

        if (isOccupied) {
            throw new IllegalArgumentException("El aula ya está ocupada en el rango de tiempo especificado");
        }

        return booking;
    }

    @Override
    public Optional<Booking> getBookingById(Long id) {
        return getAllBookings().stream()
                .filter(booking -> booking.getId() == id)
                .findFirst();
    }

    @Override
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Override
    public Booking updateBooking(Booking booking) {
        if (booking.getId() == 0) {
            throw new IllegalArgumentException("El ID debe ser especificado para actualizar la reserva");
        }

        Optional<Booking> existingBooking = bookingRepository.findById(booking.getId());
        if (existingBooking.isEmpty()) {
            throw new IllegalArgumentException("La reserva con el ID especificado no existe");
        }

        if (booking.getClassroom() == null || booking.getClassroom().getId() == 0) {
            throw new IllegalArgumentException("El aula debe ser especificada");
        }

        if (booking.getStartDate() == null || booking.getEndDate() == null) {
            throw new IllegalArgumentException("Las fechas de inicio y fin deben ser especificadas");
        }

        if (booking.getStartDate().isAfter(booking.getEndDate())) {
            throw new IllegalArgumentException("La fecha de inicio no puede ser posterior a la fecha de fin");
        }

        boolean isOccupied = getAllBookings().stream()
                .filter(b -> b.getClassroom().getId() == booking.getClassroom().getId())
                .filter(b -> b.getId() != booking.getId())
                .anyMatch(b -> booking.getStartDate().isBefore(b.getEndDate()) && booking.getEndDate().isAfter(b.getStartDate()));

        if (isOccupied) {
            throw new IllegalArgumentException("El aula ya está ocupada en el rango de tiempo especificado");
        }

        return bookingRepository.save(booking);
    }

    @Override
    public void deleteBookingById(Long id) {
        Optional<Booking> booking = getBookingById(id);
        if (booking.isEmpty()) {
            throw new RuntimeException("La Reserva con" + id + " no existe");
        }
        bookingRepository.deleteById(id);
    }
}
