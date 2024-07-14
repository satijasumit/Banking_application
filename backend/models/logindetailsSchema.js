const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    minlength: [8, "Username must be at least 8 characters long"],
    maxlength: [20, "Username must be at most 20 characters long"],
    match: [
      /^[a-zA-Z0-9]+$/,
      "Username must not contain any special characters or spaces",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters long"],
    validate: {
      validator: function (v) {
        // Regex for at least one uppercase letter, one number, and no repeated sequences
        return /^(?=.*[A-Z])(?=.*\d)(?!.*(.)\1{2,}).{8,}$/.test(v);
      },
      message:
        "Password must contain at least one uppercase letter, one number, and must not contain sequences of repeated characters",
    },
  },
  confirmPassword: {
    type: String,
    required: [true, "Confirm password is required"],
    validate: {
      validator: function (v) {
        // Check if the confirm password matches the password
        return v === this.password;
      },
      message: "Confirm password does not match password",
    },
  },
});

// Pre-save hook to hash the password before saving the user
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Method to compare password during login
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
s;