const express = require("express");
const { validateToken } = require("../middlewares/AuthMiddleware");
const router = express.Router();
const { Contacts,Users,Teams,Labos } = require("../models");

//---------------------------------------
router.post("/", async (req, res) => {
  const contact = req.body;
  await Contacts.create(contact);
  res.json(contact);
});


router.post("/create-new-member",validateToken,async (req, res)=>{
  const contact = req.body;
  const username = req.user.username;
  const boolean1 = await Labos.findOne({ where: { username: username } });
  const boolean2 = await Teams.findOne({ where: { username: username } });
  if(boolean1 || boolean2) {
    Contacts.create(contact);
  }
  else res.json({error : "Seul un responsable peut creer un membre !!"});
});


router.post("/changeProfilData/:id",async (req, res) => {
  const contact = req.body;
  const id = req.params.id;
  await Contacts.update(contact,{where :{UserId:id} });
  res.json(contact);
});

router.get("/profil/:id",async (req, res) => {
  const id = req.params.id;
  const basicInfo = await Contacts.findOne(
    {where:{UserId:id}}
  );
  res.json(basicInfo);
});

module.exports = router;