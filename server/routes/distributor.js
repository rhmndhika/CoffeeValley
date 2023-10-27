const express = require("express");
const router = express.Router();
const Distributor = require("../models/Distributor");

const addDistributor = async (req, res) => {

    const newDistributor = new Distributor(req.body);

    try {        
        const savedDistributor = await newDistributor.save();
        res.status(200).json(savedDistributor);
    } catch (error) {
        res.status(500).json(error);
    }
}

const getDistributor = async (req, res) => {
    try {
        const distributors = await Distributor.find({})
        
        res.status(200).json(distributors);
    } catch(error) {
        res.status(500).json(error);
    }
}

const getDistributorById = async (req, res) => {
    try {
        const distributor = await Distributor.findById(req.params.id)
        console.log(distributor)
        
        res.status(200).json(distributor);
    } catch(error) {
        res.status(500).json(error);
    }
}


const updateDistributor = async (req, res) => {
    
    try {
        const updateDistributor = await Distributor.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updateDistributor);
      } catch (error) {
        res.status(500).json(error);
        console.log(error);
      }
}



router.post("/distributor/add", addDistributor);
router.get("/distributor/get/all", getDistributor);
router.get("/distributor/find/:id", getDistributorById);
router.put("/distributor/update/:id", updateDistributor);


module.exports = router