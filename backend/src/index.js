const express = require("express");

const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const storeRoutes = require("./routes/storeRoutes");
const ownerRoutes = require("./routes/ownerRoutes");
const { sequelize } = require("./config/sequelize");
require("./models/index")

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  }),
);
app.use(express.json());

let port = 3000;

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/owner", ownerRoutes);
app.get("/health", (req, res) => res.json({ status: "ok" }));

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database synced successfully");

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Database sync failed:", err);
  });
