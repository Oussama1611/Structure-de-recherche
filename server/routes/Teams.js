const express = require("express");
const router = express.Router();
const { Teams,Users } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", async (req, res) => {
  const listOfTeams = await Teams.findAll();
  res.json(listOfTeams);
});

router.get("/user/:id", async (req,res)=>{
  const id = req.params.id;
  const equipe = await Teams.findOne({where : {id:id}});
  res.json(equipe);
})


router.get("/:laboid", async (req, res) => {
  const laboId = req.params.laboid;
  const listOfTeams = await Teams.findAll({where:{LaboId:laboId}});
  res.json(listOfTeams);
});

router.get("/responsable-ou-non/:username",async(req,res)=> {
  const username =req.params.username;
  const respo = await Teams.findOne({where :{username:username}});
  if(!respo) 
      res.json({error:"user n'est un respo"});
  else res.json(respo);
});


router.post("/", async (req, res) => {
  const team = req.body;
  await Teams.create(team);
  res.json(team);
});


router.delete("/:teamId", validateToken, async (req, res) => {
  const teamId = req.params.teamId;
  await Teams.destroy({
    where: {
      id: teamId,
    },
  })
});


module.exports = router;