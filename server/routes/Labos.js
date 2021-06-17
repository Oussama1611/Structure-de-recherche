const express = require("express");
const router = express.Router();
const { Labos,Users } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", async (req, res) => {
  const listOfLabos = await Labos.findAll();
  res.json(listOfLabos);
});

router.get("/responsable-ou-non/:id",async(req,res)=> {
  const username_id =req.params.id;
  const respo = await Labos.findOne({where :{UserId:username_id}});
  if(!respo) 
      res.json({error:"user n'est un respo"});
  else res.json("voila un respo");
});

router.post("/", async (req, res) => {
  const labo = req.body;
  await Labos.create(labo);
  res.json(labo);
});

module.exports = router;
