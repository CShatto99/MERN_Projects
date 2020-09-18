const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

app.use(
  cors({
    origin: "http://localhost:5000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

connectDB();

app.use("/api/auth", require("./routes/auth"));
app.use("/api/user", require("./routes/user"));
app.use("/api/profile", require("./routes/profile"));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
