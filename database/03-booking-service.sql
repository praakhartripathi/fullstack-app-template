-- ============================================================
-- 03-booking-service.sql
-- Tables for the Booking Service module within booking_service schema.
-- This is a sample schema to demonstrate multi-schema support.
-- ============================================================

SET search_path TO booking_service;

-- Bookings table: sample booking entity
CREATE TABLE IF NOT EXISTS bookings (
    id              BIGSERIAL       PRIMARY KEY,
    user_id         BIGINT          NOT NULL,
    title           VARCHAR(200)    NOT NULL,
    description     TEXT,
    status          VARCHAR(20)     NOT NULL DEFAULT 'PENDING',
    booking_date    DATE            NOT NULL,
    start_time      TIME,
    end_time        TIME,
    created_at      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Index for common queries
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings (user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings (status);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings (booking_date);
