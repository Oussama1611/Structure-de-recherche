const express = require("express");
const router = express.Router();
const { Labos,Users } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", async (req, res) => {
  const listOfLabos = await Labos.findAll();
  res.json(listOfLabos);
});

router.get("/responsable-ou-non/:id",validateToken,async(req,res)=> {
  const {username_id} =req.params.id;
  const user = await Users.findOne({where :{id:username_id}});
  const username = user.username;
  const boolean1 = await Labos.findOne({where :{username:username}});
  var bool=false;
  if(boolean1) bool=!bool;
  res.json(bool);
});

router.post("/", async (req, res) => {
  const labo = req.body;
  await Labos.create(labo);
  res.json(labo);
});

module.exports = router;