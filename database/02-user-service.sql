-- ============================================================
-- 02-user-service.sql
-- Tables for the User Service module within user_service schema.
-- ============================================================

SET search_path TO user_service;

-- Users table: core user entity
CREATE TABLE IF NOT EXISTS users (
    id              BIGSERIAL       PRIMARY KEY,
    username        VARCHAR(50)     NOT NULL UNIQUE,
    email           VARCHAR(100)    NOT NULL UNIQUE,
    password_hash   VARCHAR(255)    NOT NULL,
    first_name      VARCHAR(50)     NOT NULL,
    last_name       VARCHAR(50)     NOT NULL,
    status          VARCHAR(20)     NOT NULL DEFAULT 'ACTIVE',
    created_at      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Index for common lookup patterns
CREATE INDEX IF NOT EXISTS idx_users_email ON users (email);
CREATE INDEX IF NOT EXISTS idx_users_username ON users (username);
CREATE INDEX IF NOT EXISTS idx_users_status ON users (status);

-- Seed data for development/testing
INSERT INTO users (username, email, password_hash, first_name, last_name, status)
VALUES
    ('johndoe', 'john.doe@example.com', '$2a$10$dummy_hash_for_seed_data_1', 'John', 'Doe', 'ACTIVE'),
    ('janedoe', 'jane.doe@example.com', '$2a$10$dummy_hash_for_seed_data_2', 'Jane', 'Doe', 'ACTIVE'),
    ('admin',   'admin@example.com',    '$2a$10$dummy_hash_for_seed_data_3', 'Admin', 'User', 'ACTIVE')
ON CONFLICT DO NOTHING;
