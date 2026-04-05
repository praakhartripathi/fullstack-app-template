package com.template.booking.modules.booking.controller;

import com.template.booking.common.ApiResponse;
import com.template.booking.modules.booking.dto.BookingRequestDTO;
import com.template.booking.modules.booking.dto.BookingResponseDTO;
import com.template.booking.modules.booking.service.BookingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for Booking management.
 * Provides CRUD endpoints at /api/v1/bookings.
 */
@Slf4j
@RestController
@RequestMapping("/api/v1/bookings")
@RequiredArgsConstructor
@Tag(name = "Booking Management", description = "CRUD operations for booking management")
public class BookingController {

    private final BookingService bookingService;

    @GetMapping
    @Operation(summary = "Get all bookings")
    public ResponseEntity<ApiResponse<List<BookingResponseDTO>>> getAllBookings() {
        log.info("GET /api/v1/bookings");
        return ResponseEntity.ok(ApiResponse.success("Bookings fetched successfully",
                bookingService.getAllBookings()));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get booking by ID")
    public ResponseEntity<ApiResponse<BookingResponseDTO>> getBookingById(@PathVariable Long id) {
        log.info("GET /api/v1/bookings/{}", id);
        return ResponseEntity.ok(ApiResponse.success("Booking fetched successfully",
                bookingService.getBookingById(id)));
    }

    @GetMapping("/user/{userId}")
    @Operation(summary = "Get bookings by user ID")
    public ResponseEntity<ApiResponse<List<BookingResponseDTO>>> getBookingsByUserId(
            @PathVariable Long userId) {
        log.info("GET /api/v1/bookings/user/{}", userId);
        return ResponseEntity.ok(ApiResponse.success("Bookings fetched successfully",
                bookingService.getBookingsByUserId(userId)));
    }

    @PostMapping
    @Operation(summary = "Create a new booking")
    public ResponseEntity<ApiResponse<BookingResponseDTO>> createBooking(
            @Valid @RequestBody BookingRequestDTO request) {
        log.info("POST /api/v1/bookings");
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Booking created successfully",
                        bookingService.createBooking(request)));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an existing booking")
    public ResponseEntity<ApiResponse<BookingResponseDTO>> updateBooking(
            @PathVariable Long id, @Valid @RequestBody BookingRequestDTO request) {
        log.info("PUT /api/v1/bookings/{}", id);
        return ResponseEntity.ok(ApiResponse.success("Booking updated successfully",
                bookingService.updateBooking(id, request)));
    }

    @PatchMapping("/{id}/status")
    @Operation(summary = "Update booking status")
    public ResponseEntity<ApiResponse<BookingResponseDTO>> updateStatus(
            @PathVariable Long id, @RequestParam String status) {
        log.info("PATCH /api/v1/bookings/{}/status -> {}", id, status);
        return ResponseEntity.ok(ApiResponse.success("Booking status updated",
                bookingService.updateBookingStatus(id, status)));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a booking")
    public ResponseEntity<ApiResponse<Void>> deleteBooking(@PathVariable Long id) {
        log.info("DELETE /api/v1/bookings/{}", id);
        bookingService.deleteBooking(id);
        return ResponseEntity.ok(ApiResponse.success("Booking deleted successfully", null));
    }
}
