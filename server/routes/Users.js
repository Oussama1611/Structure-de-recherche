const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
    });
    res.json("SUCCESS");
  });
});

/* Mot de passe oublié: */
router.post("/", async (req, res) => {
  const { username, password, confirmPassword } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
      confirmPassword: hash, //the same password !
    });
    res.json("SUCCESS");
  });
});

router.post("/forgot-password", async (req, res) => {
  const { username, password, confirmPassword } = req.body;

  const user = await Users.findOne({ where: { username: username } });

  if (!user) res.json({ error: "Utilisatuer introuvable" });

  bcrypt.compare(password, user.confirmPassword).then((match) => {
    if (!match)
      res.json({ error: "Les mot de passe ne sont pas identiques !" });

    res.json("Bienvenue");
  });
});

/* fin mot de passe oublié */

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });

  if (!user) res.json({ error: "Utilisatuer introuvable" });

  bcrypt.compare(password, user.password).then((match) => {
    if (!match) res.json({ error: "Mot de passe est incorrect !" });

    res.json("Bienvenue");
  });
});

module.exports = router;
