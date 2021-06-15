const express = require("express");
const router = express.Router();
const { Teams,Users } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", async (req, res) => {
  const listOfTeams = await Teams.findAll();
  res.json(listOfTeams);
});


router.get("/responsable-ou-non/:id",validateToken,async(req,res)=> {
  const username_id =req.params.id;
  const respo = await Teams.findOne({where :{UserId:username_id}});
   if(respo) 
      res.json({etat:"1"});
  else res.json({etat:"0"});
});


router.post("/", async (req, res) => {
  const team = req.body;
  await Teams.create(team);
  res.json(team);
});

module.exports = router;