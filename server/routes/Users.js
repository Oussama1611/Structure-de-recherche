const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { sign } = require("jsonwebtoken");

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

router.post("/forgot-password", async (req, res)=> {
  const { username, password, confirmPassword } = req.body;

  const user = await Users.findOne({ where: { username: username } });

  if (!user) res.json({ error: "Utilisatuer introuvable" });
  else {
      if(!password.localeCompare(confirmPassword)) {
    bcrypt.hash(password, 10).then(async (hash) => {
      user.password = hash;
      await user.save();
      });
    res.json("Le mot de passe a ete change avec succes !");
  }
  else res.json({ error: "Veuillez confirmer votre nouveau mot de passe !" });}

})




router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });

  if (!user) res.json({ error: "Utilisatuer introuvable" });

  else { bcrypt.compare(password, user.password).then((match) => {
    if (!match) res.json({ error: "Nom d'utilisateur ou Mot de passe est incorrect !" });
    
    else {
      const accessToken = sign(
      { username: user.username, id: user.id },
      "importantsecret"
    );
    res.json(accessToken);}
  });
  }
  });

  router.get("/tokenValidating", validateToken, (req, res) => {
    res.json(req.user);
  });

/* Getting information of user for the profile page */
router.get("/information/:id", async (req, res) => {
  const id = req.params.id;

  const info = await Users.findByPk(id, {
    attributes: { exclude: ["password"] },
  });

  res.json(info);
});

module.exports = router;
