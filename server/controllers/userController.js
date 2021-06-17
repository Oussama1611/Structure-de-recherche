const express = require("express");
const multer = require('multer');
const uuid =require('uuid').v4;
const path = require('path');


// uploading images variable using multer
const storage = multer.diskStorage({
  destination:(req, file, cb) => {
    cb(null, '../Client/public/');
  },
  filename : async (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const id =uuid();
    const filePath = `/Photos/${id}${ext}`;
    cb(null, filePath);
  }
})
upload = multer({ storage: storage });
exports.uploadImage = upload.single('photo');


