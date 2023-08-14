require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const PORT = process.env.PORT || 3000;

//connect to MongoDB
connectDB();

app.use(logger);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(credentials);

//cross origin resource sharing
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

app.use("/", express.static(path.join(__dirname, "/public")));

//routes
app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

app.use(verifyJWT);
app.use("/employees", require("./routes/api/employees"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log(`Connected to MongoDB`);
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");

// const app = express();
// const port = 3000;

// // Middleware to parse request bodies
// app.use(cors());
// app.use(bodyParser.json());

// // In-memory data storage
// const storedData = {};

// // Store data
// app.post("/store", (req, res) => {
//   const { dates } = req.body;
//   for (const date in dates) {
//     storedData[date] = dates[date];
//   }
//   res.status(200).json({ message: "Data stored successfully" });
// });

// // Retrieve data
// app.get("/retrieve", (req, res) => {
//   const data = storedData;
//   if (data) {
//     res.status(200).json(data);
//   } else {
//     res.status(404).json({ message: "Data not found" });
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
