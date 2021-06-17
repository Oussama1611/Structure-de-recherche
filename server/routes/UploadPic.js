const express = require('express');
const { uploadImage } = require("../controllers/userController");
const { Contacts } = require("../models");

const router = express.Router();

router.post("/change-pic/:id", uploadImage ,async (req,res) =>{
    const id = req.params.id;
    const contact = await Contacts.findOne({where: {UserId:id}});
    contact.photo_path = req.file.filename;
    contact.save();
    console.log(req.file);
    console.log("Photo Uploaded !");
});

module.exports = router;