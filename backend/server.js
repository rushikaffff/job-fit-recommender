const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");

// Routes
const UserRouters = require("./routes/UserRouters");
const UserLogin = require("./routes/UserLogin");
const UserReset = require("./routes/Userreset");
const editUserRoutes = require("./routes/editUser");
const deleteUserRoutes = require("./routes/deleteUser");

dotenv.config();
connectDB();

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ================= ROUTES =================
app.use("/api/users", UserRouters);
app.use("/api/users", UserLogin);
app.use("/api/users", UserReset);
app.use("/api/users/edit", editUserRoutes);
app.use("/api/users", deleteUserRoutes);
app.use("/uploads", express.static("uploads")); // PUT /api/users/edit/:id

// ================= TEST ROOT =================
app.get("/", (req, res) => res.send("API running"));

// ================= START SERVER =================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
