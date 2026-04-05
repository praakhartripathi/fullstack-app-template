-- ============================================================
-- 01-init-schemas.sql
-- Creates the schemas used for microservices-style separation.
-- Each module/service gets its own schema to keep data isolated.
-- ============================================================

-- Schema for User management service
CREATE SCHEMA IF NOT EXISTS user_service;

-- Schema for Booking management service
CREATE SCHEMA IF NOT EXISTS booking_service;

-- Grant usage to the default application user
-- (The user is configured via POSTGRES_USER env variable)
GRANT ALL PRIVILEGES ON SCHEMA user_service TO CURRENT_USER;
GRANT ALL PRIVILEGES ON SCHEMA booking_service TO CURRENT_USER;
