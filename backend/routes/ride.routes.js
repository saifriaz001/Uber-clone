const express  = require("express")
const router = express.Router()
const {body, query} = require("express-validator")
const rideController = require("../controllers/ride.controllers")
const authMiddleware = require("../middlewares/auth.middleware")
router.post("/create",
    authMiddleware.authUser,
    body('userId'). isString().isLength({min:24, max:24}).withMessage("Invalid User id"),
    body('pickup').isString().isLength({min:3}).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({min:3}).withMessage('Invalid destiantion address'),
    body('vehicleType').isString().isIn(['auto','car','moto']).withMessage('Invalid vehicleType'),
    rideController.createRide
)

router.get("/get-fare",

    authMiddleware.authUser,
    rideController.getFare
)

router.post("/confirm", authMiddleware.authCaptain, rideController.confirmRide)

router.get("/start-ride",
    authMiddleware.authCaptain,
    rideController.startRide
)

router.post("/end-ride",
    authMiddleware.authCaptain,
    rideController.endRide
)


module.exports = router;