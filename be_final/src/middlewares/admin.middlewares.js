import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../model/users.model.js';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
export const isAdmin = async (req, res, next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({
            message: 'Bạn không có quyền truy cập'
        });
    }
    const token = authHeader.split(" ")[1];
    
    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.id);
    if(!user) {
        return res.status(404).json({
            message: 'Người dùng không tồn tại'
        });
    }
        if(user.role !== 'Admin'){
            return res.status(401).json({
                message: "Bạn không có quyền truy cập"
            });
          }
          next();
    }catch(error) {
        return res.status(403).json({
            message: 'Token không hợp lệ'
        });
}}