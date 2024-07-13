const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimitAndTimeout = require("./middleware/rateLimitAndTimeout");
const proxyRoutes = require("./routes/proxyRoutes");

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("combined"));
app.disable("x-powered-by");

app.use(rateLimitAndTimeout);
app.use(proxyRoutes);

app.use((_req, res) => {
  res.status(404).json({
    code: 404,
    status: "Error",
    message: "Route not found.",
    data: null,
  });
});

module.exports = app;
