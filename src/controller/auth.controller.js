const userModel = require("../models/user.model")
const blacklistTokenModel = require("../models/blacklist.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


async function registerUserController(req, res) {
    const {username, email, password} = req.body;

    if(!username || !email || !password){
        return res.status(400).json({
            message:"please provide all 3 values"
        })
    }

    const ifUserAlreadyExists = await userModel.findOne({
        $or:[{username},{email}]
    })

    if(ifUserAlreadyExists){
        return res.status(400).json({
            message:"Account with same username or email already exists"
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password: hash
    })

    const token = jwt.sign({id:user._id, username:user.username},
        process.env.JWT,
        {expiresIn: "1d"}
    )

    res.cookie("token", token)

    res.status(201).json({
        message:"user registered successfully",
        user:{
            id:user._id,
            username: user.username,
            email: user.email
        }
    })
}

/**
 * @name loginUserController
 * @description Controller function to handle user login. 
 * @access public
 */

async function loginUserController(req, res) {
    const {email, password} = req.body;

    if(!email || !password){
        res.status(400).json({
            message: "enter both username and password"
        })
    }

    const user = await userModel.findOne({email})

    if(!user){
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid){
        return res.status(400).json({
            message:"Invalid password"
        })
    }

    const token = jwt.sign({id:user._id, username:user.username},
        process.env.JWT,
        {expiresIn: "1d"}
    )

    res.cookie("token", token)
    res.status(201).json({
        message:"user loggedIn successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
}

/**
 * 
 * @name logoutUserController  
 * @description Controller to handle logout
 * @access public
 */

async function logoutUserController(req, res){
    const token = req.cookies.token;

    if(token){
        await blacklistTokenModel.create({token})
    }
    res.clearCookie("token")

    res.status(200).json({
        message:"User Loggeed Out successfully"
    })
}

async function getMeController(req, res){
    const user = await userModel.findById(req.user.id);

    return res.status(200).json({
        message:"user details fetched successfully",
        user:{
            id:user.id,
            username:user.username,
            email:user.email
        }
    })
}

module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController
};