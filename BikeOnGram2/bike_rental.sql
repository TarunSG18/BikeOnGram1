CREATE TABLE bikes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    available BOOLEAN NOT NULL DEFAULT 1
);
CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    bike_name VARCHAR(255) NOT NULL,
    rental_date DATE NOT NULL,
    rental_duration INT NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    total_cost DECIMAL(10, 2) NOT NULL
);
CREATE TABLE contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL
);
