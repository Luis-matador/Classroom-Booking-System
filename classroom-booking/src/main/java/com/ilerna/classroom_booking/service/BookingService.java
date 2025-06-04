package com.ilerna.classroom_booking.service;

import com.ilerna.classroom_booking.model.Booking;

import java.util.List;

public interface BookingService {
    Booking saveBooking(Booking booking);
    Booking getBookingById(Long id);
    List<Booking> getAllBookings();
    Booking updateBooking(Booking booking);
    void deleteBookingById(Long id);
}
