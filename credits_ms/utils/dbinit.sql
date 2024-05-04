CREATE DATABASE credits_storage;

CREATE TABLE IF NOT EXISTS global_credits(
    id SERIAL PRIMARY KEY,
    credits INTEGER
);

INSERT INTO global_credits (credits) VALUES (100);