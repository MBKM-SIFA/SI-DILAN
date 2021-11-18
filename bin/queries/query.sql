-- USE siDilan;

-- CREATE TABLE user(
--     nip VARCHAR(20) NOT NULL PRIMARY KEY,
--     passwords VARCHAR(8),
--     hash VARCHAR(255),
--     salt VARCHAR(255) 
-- );

-- CREATE TABLE applications(
--     app_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     nip VARCHAR(20),
--     FOREIGN KEY (nip) REFERENCES user(nip),
--     last_phase INT,
--     app_status VARCHAR(20),
--     app_type VARCHAR(20),
--     app_date DATE,
--     acc_date DATE,
--     institution_name VARCHAR(255),
--     acreditation VARCHAR(20),
--     institution_address VARCHAR(255),
--     institution_phone_number VARCHAR(255),
--     education_level VARCHAR(20),
--     study_program VARCHAR(20),
--     major VARCHAR(50),
--     year_of_study CHAR(4)
-- );

-- CREATE TABLE notifications(
--     notifications_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     nip VARCHAR(20),
--     FOREIGN KEY (nip) REFERENCES user(nip),
--     link TEXT,
--     content TEXT,
--     status VARCHAR(20)
-- );

-- CREATE TABLE employee_data(
--     nip VARCHAR(20),
--     PRIMARY KEY(nip),
--     FOREIGN KEY (nip) REFERENCES user(nip),
--     name VARCHAR(100),
--     nik VARCHAR(100),
--     gender VARCHAR(20),
--     place_of_birth VARCHAR(50), 
--     date_of_birth DATE,
--     religion VARCHAR(20),
--     phone VARCHAR(20),
--     email VARCHAR(50),
--     age INT,
--     profession_status VARCHAR(20),
--     specialization VARCHAR(50),
--     last_education VARCHAR(50),
--     department VARCHAR(20),
--     ranks VARCHAR(20)
-- );

-- CREATE TABLE files(
--     files_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     app_id INT,
--     FOREIGN KEY (app_id) REFERENCES applications(app_id),
--     status VARCHAR(20),
--     type VARCHAR(20),
--     filename VARCHAR(255)
-- );

-- CREATE TABLE posts(
--     post_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     post_type VARCHAR(50),
--     title varchar(20),
--     descriptions TEXT,
--     link TEXT
-- );

INSERT INTO user