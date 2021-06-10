const express = require("express");
const router = express.Router();
const { Teams } = require("../models");

router.get("/", async (req, res) => {
  const listOfTeams = await Teams.findAll();
  res.json(listOfTeams);
});

router.post("/", async (req, res) => {
  const team = req.body;
  await Teams.create(team);
  res.json(team);
});

module.exports = router;