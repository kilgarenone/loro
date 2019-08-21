const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const mountRoutes = require("./routes");

const port = process.env.PORT || 8081;

const app = express();
// app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

mountRoutes(app);

app.listen(port, () => {
  console.log(`🚀  We are live at 127.0.0.1:${port} 🚀 `);
});
