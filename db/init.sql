--SET NAMES utf8mb4;

CREATE TABLE IF NOT EXISTS readings (
    id serial PRIMARY KEY,
    ocr_result VARCHAR(20),
    correct_value VARCHAR(20),
    filename VARCHAR(50) UNIQUE NOT NULL,
    created_on TIMESTAMP NOT NULL

);