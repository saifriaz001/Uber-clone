const express = require('express');
const router = express.Router();
const{body} = require('express-validator');

const captainController = require("../controllers/captain.controllers")
const authMiddleware = require("../middlewares/auth.middleware")

router.post('/register',[
    body('email').isEmail().withMessage("Invalid Email"),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters'),
    body('vehicle.color').isLength({min:3}).withMessage('color must be at least 3 characters long'),
    body('vehicle.plate').isLength({min:3}).withMessage('plate must be at least 3 characters long'), 
    body('vehicle.capacity').isNumeric().withMessage('capacity must be a number'),
    body('vehicle.vehicleType').isIn(['bike','car','auto']).withMessage('Invalid vehicle type'),
],captainController.createCaptain
)

router.post('/login',[
    body('email').isEmail().withMessage("Invalid Email"),
],  captainController.LoginCaptain)

router.get('/profile',authMiddleware.authCaptain, captainController.getCaptainProfile)

router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain)

module.exports = router;