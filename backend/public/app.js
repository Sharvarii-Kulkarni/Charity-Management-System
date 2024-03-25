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
app.post("/app.js", (req, res) => {
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
      res.status(200).json({ message: "Data inserted successfully" });
    }
  });

  const insertQuery2 = "INSERT INTO otherdonations (name, email,contact_number,address,amount,donation_type,appoinmentDate) VALUES ($1, $2,$3,$4,$5,$6,$7)";

    // data to insert other donations
    const otherdonations = [req.body.name, req.body.email,req.body.contact_number,req.body.address,req.body.amount,req.body.donation_type, req.body.appoinmentDate];

     // Construct donation_type based on selected checkboxes
     let donation_type = [];
     if (clothes === 1) donation_type.push("clothes");
     if (furniture === 1) donation_type.push("furniture");
     if (utensils === 1) donation_type.push("utensils");
     if (other === 1) donation_type.push("other");
     donation_type = donation_type.join(", ");

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

app.listen(port, () => {
  console.log("started");
});
