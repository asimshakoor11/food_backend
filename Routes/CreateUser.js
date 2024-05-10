




const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const jwtSecret = "HiIamAsimShakoorWelcomeBackTOLearnCode"

router.post("/createuser", [
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password').isLength({ min: 5 })],
    async (req, res) => {

        let userData = await User.findOne({ email: req.body.email });

        if (userData) {
            return res.send({ message: "User Already Exist" })
        }
        else {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.send({ message: "Name & Password must be > 5 characters" })
            }

            const salt = await bcrypt.genSalt(10)
            const secPassword = await bcrypt.hash(req.body.password, salt)

            try {
                await User.create({
                    name: req.body.name,
                    password: secPassword,
                    email: req.body.email,
                    location: req.body.location
                })
                res.send({ message: "Signup Successfull!" })
            } catch (error) {
                console.log(error)
                res.send({ message: "Signup Failed" })

            }
        }

    })


router.post("/loginuser", [
    body('email').isEmail(),
    body('password').isLength({ min: 5 })],
    async (req, res) => {
        let email = req.body.email

        let userData = await User.findOne({ email });

        if (userData) {
            const pwdcompare = await bcrypt.compare(req.body.password, userData.password)
            if (!pwdcompare) {
                return res.send({ message: "Password didn't match" })
            } else {
                const data = {
                    user: {
                        id: userData.id
                    }
                }

                const authToken = jwt.sign(data, jwtSecret)

                return res.send({ message: "Login Successfull", authToken: authToken })
            }
        } else {
            return res.send({ message: "User Not Exist" })
        }
    })

module.exports = router;