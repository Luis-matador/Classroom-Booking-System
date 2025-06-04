package com.ilerna.classroom_booking.service.Implements;

import com.ilerna.classroom_booking.model.Booking;
import com.ilerna.classroom_booking.repository.BookingRepository;
import com.ilerna.classroom_booking.service.BookingService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookingImpl implements BookingService {

    private final BookingRepository bookingRepository;

    public BookingImpl(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    @Override
    @Transactional
    public Booking saveBooking(Booking booking) {
        if (booking.getStartDate() == null) {
            throw new IllegalArgumentException("La fecha de inicio no puede estar vacía");
        }

        if (booking.getEndDate() == null) {
            throw new IllegalArgumentException("La fecha de fin no puede estar vacía");
        }

        if (booking.getEndDate().isBefore(booking.getStartDate())) {
            throw new IllegalArgumentException("La fecha de fin no puede ser anterior a la fecha de inicio");
        }

        if (booking.getUser() == null || booking.getUser().getId() <= 0) {
            throw new IllegalArgumentException("El usuario debe ser especificado");
        }

        if (booking.getClassroom() == null || booking.getClassroom().getId() <= 0) {
            throw new IllegalArgumentException("El aula debe ser especificada");
        }

        if (booking.getState() == null || booking.getState().trim().isEmpty()) {
            throw new IllegalArgumentException("El estado debe ser especificado");
        }

        if (booking.getReason() == null || booking.getReason().trim().isEmpty()) {
            throw new IllegalArgumentException("El motivo debe ser especificado");
        }
    
        return bookingRepository.save(booking);
    }

    @Override
    public Optional<Booking> getBookingById(Long id) {
        return bookingRepository.findById(id);
    }

    @Override
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Override
    @Transactional
    public Booking updateBooking(Booking booking) {
        if (booking == null || booking.getId() <= 0) {
            throw new IllegalArgumentException("El ID de la reserva debe ser especificado");
        }

        Optional<Booking> existingBooking = bookingRepository.findById(booking.getId());
        if (existingBooking.isEmpty()) {
            throw new IllegalArgumentException("La reserva con el ID especificado no existe");
        }

        if (booking.getStartDate() == null) {
            throw new IllegalArgumentException("La fecha de inicio no puede estar vacía");
        }

        if (booking.getEndDate() == null) {
            throw new IllegalArgumentException("La fecha de fin no puede estar vacía");
        }

        if (booking.getEndDate().isBefore(booking.getStartDate())) {
            throw new IllegalArgumentException("La fecha de fin no puede ser anterior a la fecha de inicio");
        }

        if (booking.getUser() == null || booking.getUser().getId() <= 0) {
            throw new IllegalArgumentException("El usuario debe ser especificado");
        }

        if (booking.getClassroom() == null || booking.getClassroom().getId() <= 0) {
            throw new IllegalArgumentException("El aula debe ser especificada");
        }

        if (booking.getState() == null || booking.getState().trim().isEmpty()) {
            throw new IllegalArgumentException("El estado debe ser especificado");
        }

        if (booking.getReason() == null || booking.getReason().trim().isEmpty()) {
            throw new IllegalArgumentException("El motivo debe ser especificado");
        }

        return bookingRepository.save(booking);
    }

    @Override
    @Transactional
    public void deleteBookingById(Long id) {
        Booking booking = getBookingById(id).orElseThrow(() -> new IllegalArgumentException("Reserva no encontrada con id: " + id));
        bookingRepository.delete(booking);
    }
}
