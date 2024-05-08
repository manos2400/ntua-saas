CREATE DATABASE credits_storage;

USE credits_storage;

CREATE TABLE global_credits(
    credits_id INT NOT NULL AUTO_INCREMENT,
    credits INT,
    PRIMARY KEY (credits_id)
);

INSERT INTO global_credits (credits) VALUES (100);