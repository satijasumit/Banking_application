const express = require("express");
const bodyParser = require("body-parser");
const twilio = require("twilio");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

const client = new twilio(accountSid, authToken);

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

// Define a schema for OTP collection
const otpSchema = new mongoose.Schema({
    phoneNumber: String,
    otp: String
});

// Create a model for the OTP collection
const OtpModel = mongoose.model("Otp", otpSchema);

// Generate a random 6-digit OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000);
};

// Root route for handling GET requests to "/"
app.get("/", (req, res) => {
    res.send("OTP Verification Service");
});

// API endpoint to initiate OTP generation and send to the user's phone number
app.post("/send-otp", (req, res) => {
    const { phoneNumber } = req.body;
    const otp = generateOTP();

    // Save OTP to MongoDB
    const otpDocument = new OtpModel({ phoneNumber, otp });

    otpDocument.save()
        .then(() => {
            client.messages
                .create({
                    body: `Your OTP is ${otp}`,
                    from: "+18555985013",
                    to: phoneNumber
                })
                .then(() => {
                    console.log(`OTP sent to ${phoneNumber}: ${otp}`);
                    res.send({ success: true, otp: otp });
                })
                .catch(err => {
                    console.error('Error sending OTP via Twilio:', err);
                    res.status(500).send({ success: false, error: "Failed to send OTP" });
                });
        })
        .catch(err => {
            console.error('Error saving OTP to MongoDB:', err);
            res.status(500).send({ success: false, error: "Failed to save OTP" });
        });
});

// API endpoint to verify the entered OTP
app.post("/verify-otp", async (req, res) => {
    const { phoneNumber, userOTP } = req.body;

    try {
        // Retrieve OTP from MongoDB
        const otpDocument = await OtpModel.findOne({ phoneNumber, otp: userOTP });

        if (otpDocument) {
            console.log(`OTP verified for ${phoneNumber}`);
            res.send({ success: true });
        } else {
            console.log(`Invalid OTP for ${phoneNumber}`);
            res.status(401).send({ success: false, error: "Invalid OTP" });
        }
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).send({ success: false, error: "Error verifying OTP" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
