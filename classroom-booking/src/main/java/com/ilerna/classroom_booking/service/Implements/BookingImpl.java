package com.ilerna.classroom_booking.service.Implements;

import com.ilerna.classroom_booking.model.Booking;
import com.ilerna.classroom_booking.service.BookingService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookingImpl implements BookingService {

    @Override
    public Booking saveBooking(Booking booking) {
        return null;
    }

    @Override
    public Optional<Booking> getBookingById(Long id) {
        return Optional.empty();
    }

    @Override
    public List<Booking> getAllBookings() {
        return List.of();
    }

    @Override
    public Booking updateBooking(Booking booking) {
        return null;
    }

    @Override
    public void deleteBookingById(Long id) {

    }
}
