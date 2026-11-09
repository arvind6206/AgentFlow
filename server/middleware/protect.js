import jwt from 'jsonwebtoken'
import { UserModel } from '../model/user.model.js'

export const protect = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if(!token){
            return res.status(401).json({
                msg: "Unauthorized"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await UserModel.findById(decoded.userId)
        if(!user){
            return res.status(404).json({
                msg: "User not found"
            })
        }

        req.user = user
        next()
    } catch (error) {
        return res.status(500).json({
            msg: `protect error ${error}`
        })
    }
}