CREATE TABLE donors (donor_id SERIAL PRIMARY KEY, name VARCHAR(100) NOT NULL, 
                    email VARCHAR(100) NOT NULL,
                    contact_number VARCHAR(20) NOT NULL,
                    address TEXT NOT NULL, 
                    amount integer);

CREATE TABLE donations (
    donation_id SERIAL PRIMARY KEY,
    donor_id INT REFERENCES donors(donor_id),
    amount NUMERIC(10, 2),
    donation_type VARCHAR(50)
);

CREATE TABLE appointments (
    appointment_id SERIAL PRIMARY KEY,
    donor_id INT REFERENCES donors(donor_id),
    appointment_date DATE NOT NULL
);

CREATE TABLE commodities (
    commodity_id SERIAL PRIMARY KEY,
    donor_id INT REFERENCES donors(donor_id),
    c_type VARCHAR(100) NOT NULL
);

CREATE TABLE otherdonations{
    donation_id SERIAL PRIMARY KEY,
    donor_id INT REFERENCES donors(donor_id),
    name VARCHAR(100) REFERENCES donors(name),
    email VARCHAR(20) REFERENCES donors(email),
    contact_number INT REFERENCES donors(contact_number),
    address VARCHAR REFERENCES donors(address),
    amount integer,
    donation_type VARCHAR(50),
    appointment_date DATE NOT NULL,
}