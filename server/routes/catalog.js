const express = require("express");
const router = express.Router();
const Catalog = require("../models/Catalog");

const addCatalog = async (req, res) => {

    const newCatalog = new Catalog(req.body);

    try {        
        const saveCatalog = await newCatalog.save();
        res.status(200).json(saveCatalog);
    } catch (error) {
        res.status(500).json(error);
    }
}

const getCatalog = async (req, res) => {
    try {
        const catalog = await Catalog.find({})
        
        res.status(200).json(catalog);
    } catch(error) {
        res.status(500).json(catalog);
    }
}


router.post("/catalog/add", addCatalog);
router.get("/catalog/get/all", getCatalog);

module.exports = router