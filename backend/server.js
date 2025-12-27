const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const UserRouters = require("./routes/UserRouters");
const UserLogin = require("./routes/UserLogin");
const Usereset=require("./routes/Userreset");// relative path
dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json());
// Attach router
app.use("/api/users", UserRouters);
app.use("/api/users", UserLogin);
app.use("/api/users", Usereset);
// Test root
app.get("/", (req, res) => res.send("API running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

