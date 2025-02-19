const express = require("express");
const app = express();
const { Pool } = require("pg");

// Create a new pool instance
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "charity",
  password: "sharvari3083",
  port: 5432, // Default PostgreSQL port
});
const port = 8000;
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.post("/donate", (req, res) => {
  // let nam = req.body.name;
  const insertQuery = "INSERT INTO donors (name, email,contact_number,address,amount) VALUES ($1, $2,$3,$4,$5)";

  // Sample data to insert
  const userData = [req.body.name, req.body.email,req.body.contact_number,req.body.address,req.body.amount];

  // Execute the INSERT query using the pool
  pool.query(insertQuery, userData, (error1, result1) => {
    if (error1) {
      console.error("Error executing query:", error1);
      res.status(500).json({ error: "Error inserting data into database." });
    } else {
      console.log("Data inserted successfully:", result1.rows);
      res.status(200).json({ message: "Data inserted successfully!" });
    }
  });
});

app.post("/donor", (req, res) => {
  const insertQuery2 = "INSERT INTO otherdonations (name, email,contact_number,address,amount,donation_type,appointment_date) VALUES ($1, $2,$3,$4,$5,$6,$7)";

    // data to insert other donations
    const otherdonations = [req.body.name, req.body.email, req.body.contact_number, req.body.address, req.body.amount,req.body.donation_type, req.body.appointmentDate];

    console.log('name ',req.body.name,'email', req.body.email,'contact', req.body.contact_number,'add', req.body.address,'amount', req.body.amount,'donation type', req.body.donation_type,'date', req.body.appointmentDate)

    // Execute the INSERT query using the pool
    pool.query(insertQuery2, otherdonations, (error2, result2) => {
    if (error2) {
      console.error("Error executing query:", error2);
      res.status(500).json({ error: "Error inserting data into database." });
    } else {
      console.log("Data inserted successfully:", result2.rows);
      res.status(200).json({ message: "Data inserted successfully" });
    }
  });
});

// Handle GET request for logging in
app.get("/donors", (req, res) => {
    pool.query('SELECT * FROM otherdonations', (error, results) => {
      if (error) {
        console.error('Error fetching donor details:', error);
        res.status(500).json({ error: 'Error fetching donor details.' });
      } else {
        res.status(200).json(results.rows); // Return donor details as JSON
      }
    });
  
});
app.listen(port, () => {
  console.log("started");
});
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});
//http://localhost:8000/invalidroute