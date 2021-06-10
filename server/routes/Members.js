const express = require("express");
const router = express.Router();
const { Members } = require("../models");

router.get("/", async (req, res) => {
  const listOfMembers = await Members.findAll();
  res.json(listOfMembers);
});

router.post("/", async (req, res) => {
  const member = req.body;
  await Members.create(member);
  res.json(member);
});

module.exports = router;