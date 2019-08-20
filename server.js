const express = require("express");
const mountRoutes = require("./routes");

const app = express();
mountRoutes(app);
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`🚀 We are live at 127.0.0.1:${port}`);
});
