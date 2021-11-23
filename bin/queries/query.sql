USE siDilan;

CREATE TABLE user(
    nip VARCHAR(50) NOT NULL PRIMARY KEY,
    hash VARCHAR(255),
    salt VARCHAR(255) 
);

CREATE TABLE applications(
    app_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nip VARCHAR(50),
    FOREIGN KEY (nip) REFERENCES user(nip),
    last_phase INT,
    app_status VARCHAR(20),
    app_type VARCHAR(20),
    app_date DATE,
    acc_date DATE,
    institution_name VARCHAR(255),
    acreditation VARCHAR(50),
    institution_address VARCHAR(255),
    institution_phone_number VARCHAR(255),
    education_level VARCHAR(255),
    study_program VARCHAR(255),
    major VARCHAR(255),
    year_of_study VARCHAR(20) ,
    link VARCHAR(100)
);

CREATE TABLE notifications(
    notifications_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nip VARCHAR(20),
    FOREIGN KEY (nip) REFERENCES user(nip),
    link TEXT,
    content TEXT,
    status VARCHAR(20)
);

CREATE TABLE employee_data(
    nip VARCHAR(50),
    PRIMARY KEY(nip),
    FOREIGN KEY (nip) REFERENCES user(nip),
    name VARCHAR(225),
    nik VARCHAR(100),
    gender VARCHAR(2225),
    place_of_birth VARCHAR(225), 
    date_of_birth DATE,
    religion VARCHAR(225),
    phone VARCHAR(225),
    email VARCHAR(225),
    age INT,
    profession_status VARCHAR(225),
    specialization VARCHAR(225),
    last_education VARCHAR(225),
    department VARCHAR(225),
    ranks VARCHAR(225),
    photo VARCHAR(225)
);

CREATE TABLE files(
    files_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    app_id INT,
    FOREIGN KEY (app_id) REFERENCES applications(app_id),
    status VARCHAR(50),
    type VARCHAR(50),
    filename VARCHAR(255)
);

CREATE TABLE posts(
    post_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    study_program VARCHAR(100),
    open_date DATE,
    close_date DATE,
    acreditation VARCHAR(100),
    post_date DATE,
    institute VARCHAR(100),
    link TEXT,
    photo VARCHAR(100)
);