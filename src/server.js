const express = require("express");
const cors = require("cors");
require("dotenv").config();

const indexRoutes = require("./routes/indexRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/api", indexRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
