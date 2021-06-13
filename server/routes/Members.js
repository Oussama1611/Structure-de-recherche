const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/AuthMiddleware");
const { Members } = require("../models");

router.get("/", async (req, res) => {
  const listOfMembers = await Members.findAll();
  res.json(listOfMembers);
});
router.post("/create-new-member",validateToken,async (req, res)=>{
  const member = req.body;
  const username = req.user.username;
  const boolean1 = await Labos.findOne({ where: { username: username } });
  const boolean2 = await Teams.findOne({ where: { username: username } });
  if(boolean1 || boolean2) {
    Members.create(member);
  }
  else res.json({error : "Seul un responsable peut creer un membre !!"});
});

router.post("/", async (req, res) => {
  const member = req.body;
  await Members.create(member);
  res.json(member);
});

module.exports = router;