const express = require("express");
const router = express.Router();
const { Labos } = require("../models");

router.get("/", async (req, res) => {
  const listOfLabos = await Labos.findAll();
  res.json(listOfLabos);
});

router.post("/", async (req, res) => {
  const labo = req.body;
  await Labos.create(labo);
  res.json(labo);
});

module.exports = router;