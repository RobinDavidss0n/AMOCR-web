--SET NAMES utf8mb4;

CREATE TABLE IF NOT EXISTS readings (
    id serial PRIMARY KEY,
    ocr_result VARCHAR(20),
    correct_value VARCHAR(25),
    filename VARCHAR(50) UNIQUE NOT NULL,
    original_name varchar(50),
    ppt varchar(20),
    color_depth varchar(20),
    is_base_image boolean NOT NULL,
    created_on TIMESTAMP NOT NULL

);