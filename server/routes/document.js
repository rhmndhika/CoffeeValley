const express = require("express");
const router = express.Router();
const Document = require("../models/Document");
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'images'); 
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + '-' + file.originalname);
    },
  });
  
const upload = multer({ storage });

const addDocument = async (req, res) => {
    try {
      const { title, author, creator } = req.body;
  
      const existingDocument = await Document.findOne({ title });
  
      if (existingDocument) {
        return res.status(409).json({ message: 'Dokument dengan nama yang sama sudah ada' });
      }
      
      const documentFile = `http://localhost:5000/images/${req.file.filename}`;
  
  
      const newDocument = new Document({ title, documentFile, author, creator });
      await newDocument.save();
  
      res.status(201).json();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  const getDocument = async (req, res) => {
    try {
        const documents = await Document.find({}).populate('author');
        
        res.status(200).json(documents);
    } catch(error) {
        res.status(500).json(error);
    }
}

  router.post("/document/add", upload.single('documentFile'), addDocument);
  router.get("/document/get", getDocument);

  module.exports = router;