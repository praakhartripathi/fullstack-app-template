package com.template.booking.modules.booking.repository;

import com.template.booking.modules.booking.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByUserId(Long userId);

    List<Booking> findByStatus(String status);

    List<Booking> findByBookingDate(LocalDate bookingDate);

    List<Booking> findByUserIdAndStatus(Long userId, String status);
}
