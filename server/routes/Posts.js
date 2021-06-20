const express = require("express");
const { validateToken } = require("../middlewares/AuthMiddleware");
const router = express.Router();
const { Posts } = require("../models");

router.get("/", async (req, res) => {
  const listOfPosts = await Posts.findAll();
  res.json(listOfPosts);
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const listOfPosts = await Posts.findAll({where:{UserId:id}});
  res.json(listOfPosts);
});


router.post("/", async (req, res) => {
  const post = req.body;
  await Posts.create(post);
  res.json(post);
});

router.delete("/:postId", validateToken, async (req, res) => {
  const postId = req.params.postId;
  await Posts.destroy({
    where: {
      id: postId,
    },
  })
});

module.exports = router;