import User from '../models/user'

export const getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users)
}

export const getUserById = async (req, res) => {
    const user = await User.findById(req.params.userId);
    res.status(200).json(user)
} 

export const updateUserById = async (req, res) => {
    const updateUser = await User.findByIdAndUpdate(req.params.userId, req.body, {
        new: true
    })
    res.status(200).json(updateUser)
}

export const deleteUserById = async (req, res) => {
    await User.findByIdAndDelete(req.params.userId)
    res.status(204).json()
}
