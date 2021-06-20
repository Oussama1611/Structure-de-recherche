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
// uploading files using multer
const storage2 = multer.diskStorage({
  destination:(req, file, cb) => {
    cb(null, '../Client/public/');
  },
  filename : async (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const id =uuid();
    const filePath = `/PDFs/${id}${ext}`;
    cb(null, filePath);
  }
})
upload2 = multer({storage: storage2})

exports.uploadImage = upload.single('photo');
exports.uploadFile = upload2.single('file');

