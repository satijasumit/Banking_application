const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const dbConfig = require("./config/db");
const morgan = require("morgan");
const cors = require("cors");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Database Connection
dbConfig();

app.get("/", (req, res) => {
  res.send("API is running...");
});

//Routes
app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});