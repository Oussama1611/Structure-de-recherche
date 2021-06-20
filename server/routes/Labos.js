const express = require("express");
const router = express.Router();
const { Labos,Users} = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", async (req, res) => {
  const listOfLabos = await Labos.findAll();
  res.json(listOfLabos);
});

router.get("/:laboid", async (req,res) => {
  const laboId = req.params.laboid;
  const labo = Labos.findOne({where : {id : laboId}})
  res.json(labo);
})
router.get("/responsable-ou-non/:username",async(req,res)=> {
  const username =req.params.username;
  const respo = await Labos.findOne({where :{username:username}});
  if(!respo) 
      res.json({error:"user n'est un respo"});
  else res.json("voila un respo");
});

router.post("/", async (req, res) => {
  const labo = req.body;
  await Labos.create(labo);
  res.json(labo);
});

/*router.delete("/:laboId", validateToken, async (req, res) => {
  const laboId = req.params.laboId;
  await Labos.destroy({
    where: {
      id: laboId,
    },
  })
}); */


module.exports = router;
