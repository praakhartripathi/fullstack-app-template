package com.template.booking.modules.booking.service;

import com.template.booking.exception.ResourceNotFoundException;
import com.template.booking.modules.booking.dto.BookingRequestDTO;
import com.template.booking.modules.booking.dto.BookingResponseDTO;
import com.template.booking.modules.booking.entity.Booking;
import com.template.booking.modules.booking.repository.BookingRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Booking service implementation with full CRUD and status management.
 */
@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;

    @Override
    @Transactional(readOnly = true)
    public List<BookingResponseDTO> getAllBookings() {
        log.info("Fetching all bookings");
        return bookingRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public BookingResponseDTO getBookingById(Long id) {
        log.info("Fetching booking with id: {}", id);
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking", "id", id));
        return mapToResponse(booking);
    }

    @Override
    @Transactional(readOnly = true)
    public List<BookingResponseDTO> getBookingsByUserId(Long userId) {
        log.info("Fetching bookings for user: {}", userId);
        return bookingRepository.findByUserId(userId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public BookingResponseDTO createBooking(BookingRequestDTO request) {
        log.info("Creating booking for user: {}", request.getUserId());

        Booking booking = Booking.builder()
                .userId(request.getUserId())
                .title(request.getTitle())
                .description(request.getDescription())
                .bookingDate(request.getBookingDate())
                .startTime(request.getStartTime())
                .endTime(request.getEndTime())
                .status("PENDING")
                .build();

        Booking saved = bookingRepository.save(booking);
        log.info("Booking created with id: {}", saved.getId());
        return mapToResponse(saved);
    }

    @Override
    public BookingResponseDTO updateBooking(Long id, BookingRequestDTO request) {
        log.info("Updating booking with id: {}", id);

        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking", "id", id));

        booking.setUserId(request.getUserId());
        booking.setTitle(request.getTitle());
        booking.setDescription(request.getDescription());
        booking.setBookingDate(request.getBookingDate());
        booking.setStartTime(request.getStartTime());
        booking.setEndTime(request.getEndTime());

        Booking updated = bookingRepository.save(booking);
        log.info("Booking updated with id: {}", updated.getId());
        return mapToResponse(updated);
    }

    @Override
    public void deleteBooking(Long id) {
        log.info("Deleting booking with id: {}", id);
        if (!bookingRepository.existsById(id)) {
            throw new ResourceNotFoundException("Booking", "id", id);
        }
        bookingRepository.deleteById(id);
        log.info("Booking deleted with id: {}", id);
    }

    @Override
    public BookingResponseDTO updateBookingStatus(Long id, String status) {
        log.info("Updating booking {} status to: {}", id, status);

        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking", "id", id));

        booking.setStatus(status);
        Booking updated = bookingRepository.save(booking);
        return mapToResponse(updated);
    }

    private BookingResponseDTO mapToResponse(Booking booking) {
        return BookingResponseDTO.builder()
                .id(booking.getId())
                .userId(booking.getUserId())
                .title(booking.getTitle())
                .description(booking.getDescription())
                .status(booking.getStatus())
                .bookingDate(booking.getBookingDate())
                .startTime(booking.getStartTime())
                .endTime(booking.getEndTime())
                .createdAt(booking.getCreatedAt())
                .updatedAt(booking.getUpdatedAt())
                .build();
    }
}
