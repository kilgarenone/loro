const express = require("express");
const mountRoutes = require("./routes");

const port = process.env.PORT || 8081;

const app = express();
mountRoutes(app);

app.listen(port, () => {
  console.log(`🚀  We are live at 127.0.0.1:${port} 🚀 `);
});
