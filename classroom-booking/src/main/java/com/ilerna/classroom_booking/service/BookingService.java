package com.ilerna.classroom_booking.service;

import com.ilerna.classroom_booking.model.Booking;

import java.util.List;
import java.util.Optional;

public interface BookingService {
    Booking saveBooking(Booking booking);
    Optional<Booking> getBookingById(Long id);
    List<Booking> getAllBookings();
    Booking updateBooking(Booking booking);
    void deleteBookingById(Long id);
}
