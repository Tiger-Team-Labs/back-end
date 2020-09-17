import User from '../models/user'
import jwt from 'jsonwebtoken'
import config from '../config'
import Role from '../models/role'

export const signUp = async (req, res) =>  {
    // get the request body
    const {name, username, email, password, roles} = req.body;
    //create new user
    const newUser = new User({
        name,
        username,
        email,
        password: await User.encryptPassword(password)
    })
    //check roles
    if (roles) {
        const foundRoles = await Role.find({name: {$in: roles}})
        newUser.roles = foundRoles.map(role => role._id)
    } else {
        const role = await Role.findOne({name: "user"})
        newUser.roles = [role._id];
    }
    // save user in mongoDB
    const savedUser = await newUser.save();
    console.log(savedUser)
    // create token
    const token = jwt.sign({id: savedUser._id}, config.SECRET, {
        expiresIn: 86400 // 24 horas
    })

    res.status(200).json({token})

}

export const logIn = async (req, res) => {
    //request body email or username
    const userFound = await User.findOne({email: req.body.email}).populate("roles");
    
    if (!userFound) return res.status(400).json({message: "User not found"})

    const matchPassword = await User.comparePassword(req.body.password, userFound.password)

    if (!matchPassword) return res.status(401).json({token: null, message: "Invalid password"})

    const token = jwt.sign({id: userFound._id}, config.SECRET, {
        expiresIn: 86400
    })

    res.json({token})
}


