const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const services = require("../config/services");

const router = express.Router();

services.forEach(({ route, target }) => {
  const proxyOptions = {
    target,
    changeOrigin: true,
    pathRewrite: {
      [`^${route}`]: "",
    },
  };
  router.use(route, createProxyMiddleware(proxyOptions));
});

module.exports = router;
