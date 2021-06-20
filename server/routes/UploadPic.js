const express = require('express');
const { uploadImage, uploadFile } = require("../controllers/userController");
const { Posts, Contacts } = require("../models");

const router = express.Router();

router.post("/change-pic/:id", uploadImage ,async (req,res) =>{
    const id = req.params.id;
    const contact = await Contacts.findOne({where: {UserId:id}});
    contact.photo_path = req.file.filename;
    contact.save();
    console.log(req.file);
    console.log("Photo Uploaded !");
});
router.post("/upload-file",uploadFile,async (req,res) =>{
    const title = req.headers.title;
    const post = await Posts.findOne({where: {title:title}});
    post.supportfile_path = req.file.filename;
    post.save();
    console.log(req.file);
    console.log("File Uploaded !");
})

module.exports = router;