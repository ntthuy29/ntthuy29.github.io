import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || 'mySecretToken'
export const authToken = async (req, res, next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(401).json({
            message: 'Khong co quyen'
        })
    }
    const token = authHeader.split(' ')[1];
    try{
        const decoded = jwt.verify(token,JWT_SECRET);
        req.user = decoded;
        next();

    }catch(error){
 return res.status(403).json({ message: 'Token không hợp lệ' });
    }



}