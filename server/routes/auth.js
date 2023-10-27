const express = require("express");
const router = express.Router();
const User = require("../models/User");
const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");


const Register = async (req, res) => {
    const { userID, password } = req.body;
  
    try {
      // Check if the username or email already exists in the database
      const existingUser = await User.findOne({
        $or: [{ userID: userID }],
      });
  
      if (existingUser) {
        // Either username or email is already taken
        return res.status(400).json({ message: 'UserID is already taken.' });
      }
  
      // Create a new user
      const newUser = new User({
        userID: userID,
        password: CryptoJs.AES.encrypt(password, process.env.PASS_SEC).toString(),
      });
  
      // Save the new user to the database
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  

const Login = async (req, res) => {
    try {
        const user = await User.findOne({ userID: req.body.userID });

        if (!user) {
            return res.status(401).json({ message: "Wrong userID!" });
        }

        const hashedPassword = CryptoJs.AES.decrypt(user.password, process.env.PASS_SEC);
        const originalPassword = hashedPassword.toString(CryptoJs.enc.Utf8);
        
        if (originalPassword !== req.body.password) {
            return res.status(401).json({ message: "Please input the correct password!" });
        }

        const accessToken = jwt.sign(
            { id: user._id },
            process.env.JWT_SEC,
            { expiresIn: "3d" }
        );

        const { password, ...others } = user._doc; 
        console.log(user)
       
        return res.status(200).json({ ...others, accessToken, username:  user.userID, userID: user._id  });
          
    } catch(err) {
        console.log(err);
        // Handle the error appropriately (e.g., send an error response)
        return res.status(500).json({ message: "Internal Server Error" });
    }
};



router.post("/register", Register);
router.post("/login", Login);



module.exports = router