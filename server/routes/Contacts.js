const express = require("express");
const router = express.Router();
const { Contacts } = require("../models");

router.get("/", async (req, res) => {
  const listOfContacts = await Contacts.findAll();
  res.json(listOfContacts);
});

router.post("/", async (req, res) => {
  const contact = req.body;
  await Contacts.create(contact);
  res.json(contact);
});

module.exports = router;