const express = require("express");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const User = require("../models/User");

const router = express.Router();

/* ================= OTP STORE ================= */
const otpStore = {}; 
// { email: { otp, expiresAt } }

/* =================================================
   POST /forgot-password → Send OTP
   ================================================= */
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    otpStore[email] = {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000,
    };

    /* ========== SMTP CONFIG INSIDE TRY ========== */
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD, // APP PASSWORD
      },
    });

    // 🔍 VERIFY SMTP CONNECTION
    await transporter.verify();

    await transporter.sendMail({
      from: `"Support Team" <${process.env.SMTP_EMAIL}>`,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP is ${otp}. Valid for 5 minutes.`,
    });

    res.status(200).json({ message: "OTP sent to email" });

  } catch (error) {
    console.error("SMTP / Forgot Password Error:", error.message);
    res.status(500).json({
      message: "Failed to send OTP. Check email configuration.",
    });
  }
});

/* =================================================
   POST /reset-password → Verify OTP + Update Password
   ================================================= */
router.post("/reset-password", async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        message: "Email, OTP and new password are required",
      });
    }

    const storedOtp = otpStore[email];

    if (!storedOtp) {
      return res.status(400).json({ message: "OTP not found" });
    }

    if (storedOtp.expiresAt < Date.now()) {
      delete otpStore[email];
      return res.status(400).json({ message: "OTP expired" });
    }

    if (storedOtp.otp != otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.findOneAndUpdate(
      { email },
      { password: hashedPassword }
    );

    delete otpStore[email];

    res.status(200).json({ message: "Password reset successful" });

  } catch (error) {
    console.error("Reset Password Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
