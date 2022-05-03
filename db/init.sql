--SET NAMES utf8mb4;

CREATE TABLE IF NOT EXISTS readings (
    id serial PRIMARY KEY,
    ocr_result VARCHAR(20),
    correct_value VARCHAR(25),
    correct_digits INTEGER,
    all_correct BOOLEAN,
    filename VARCHAR(100) UNIQUE NOT NULL,
    original_name varchar(50),
    ppt varchar(20),
    color_depth varchar(20),
    bin_size INTEGER,
    zip_size INTEGER,
    png_size INTEGER,
    is_base_image BOOLEAN NOT NULL,
    created_on TIMESTAMP NOT NULL

);