package com.template.booking.modules.booking.service;

import com.template.booking.modules.booking.dto.BookingRequestDTO;
import com.template.booking.modules.booking.dto.BookingResponseDTO;

import java.util.List;

public interface BookingService {

    List<BookingResponseDTO> getAllBookings();

    BookingResponseDTO getBookingById(Long id);

    List<BookingResponseDTO> getBookingsByUserId(Long userId);

    BookingResponseDTO createBooking(BookingRequestDTO request);

    BookingResponseDTO updateBooking(Long id, BookingRequestDTO request);

    void deleteBooking(Long id);

    BookingResponseDTO updateBookingStatus(Long id, String status);
}
