import user from '../models/user'
import jwt from 'jsonwebtoken'
import config from '../config'
import Role from '../models/role'

export const signUp = async (req, res) =>  {
    const {name, username, email, password, roles} = req.body;

    const newUser = new user({
        name,
        username,
        email,
        password: await user.encryptPassword(password)
    })

    if (roles) {
        const foundRoles = await Role.find({name: {$in: roles}})
        newUser.roles = foundRoles.map(role => role._id)
    } else {
        const role = await Role.findOne({name: "user"})
        newUser.roles = [role._id];
    }

    const savedUser = await newUser.save();
    console.log(savedUser)

    const token = jwt.sign({id: savedUser._id}, config.SECRET, {
        expiresIn: 86400 // 24 horas
    })

    res.status(200).json({token})

}

export const logIn = async (req, res) => {
    res.json('login')
}


