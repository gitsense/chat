-- Migration: Add error tracking to import data system
-- Purpose: Add tables and fields to track import errors and generate statistics

-- Add error tracking fields to file_storage table
ALTER TABLE file_storage ADD COLUMN error_type TEXT;
ALTER TABLE file_storage ADD COLUMN error_code TEXT;
ALTER TABLE file_storage ADD COLUMN error_message TEXT;
ALTER TABLE file_storage ADD COLUMN error_details TEXT;
ALTER TABLE file_storage ADD COLUMN retry_count INTEGER DEFAULT 0;
ALTER TABLE file_storage ADD COLUMN last_retry_at INTEGER;

-- Create import_errors table for detailed error tracking
CREATE TABLE import_errors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    storage_id TEXT NOT NULL,
    error_type TEXT NOT NULL,
    error_code TEXT,
    error_message TEXT NOT NULL,
    error_details TEXT,
    stack_trace TEXT,
    occurred_at INTEGER NOT NULL,
    resolved_at INTEGER,
    resolution_method TEXT,
    FOREIGN KEY (storage_id) REFERENCES file_storage(id) ON DELETE CASCADE
);

-- Create indexes for import_errors table
CREATE INDEX idx_import_errors_storage_id ON import_errors(storage_id);
CREATE INDEX idx_import_errors_occurred_at ON import_errors(occurred_at);

-- Create import_stats table for analytics
CREATE TABLE import_stats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    total_imports INTEGER DEFAULT 0,
    successful_imports INTEGER DEFAULT 0,
    failed_imports INTEGER DEFAULT 0,
    error_types TEXT,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);

-- Create unique index for import_stats date
CREATE UNIQUE INDEX idx_import_stats_date ON import_stats(date);
