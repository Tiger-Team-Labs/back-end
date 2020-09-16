import user from '../models/user'
import jwt from 'jsonwebtoken'
import config from '../config'

export const signUp = async (req, res) =>  {
    const {name, username, email, password, roles} = req.body;

    const newUser = new user({
        name,
        username,
        email,
        password: await user.encryptPassword(password)
    })

    const savedUser = await newUser.save();

    const token = jwt.sign({id: savedUser._id}, config.SECRET, {
        expiresIn: 86400 // 24 horas
    })

    res.status(200).json({token})

}

export const logIn = async (req, res) => {
    res.json('login')
}


