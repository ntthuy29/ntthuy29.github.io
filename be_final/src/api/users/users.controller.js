import mongoose from 'mongoose'
import jwt from 'jsonwebtoken';
import bcrypt, { getSalt } from 'bcryptjs';
import Team from '../../model/team.model.js';
import nodemailer from 'nodemailer';
import User from '../../model/users.model.js';

import dotenv from 'dotenv';
dotenv.config();

export const registerUser = async(req, res)=>{
    try{
        const {username, password,role,teamId} = req.body;
    const userExit = await User.findOne({username});
    if(userExit){
        return res.status(400).json({message: 'Username đã tồn tại'});
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const JWT_SECRET = 'mySecretKey';
    const newUser = new User({
        username :  username,
        password: hashPassword,
        role: role,
        teamId: teamId,
    });
    await newUser.save();
    return res.status(201).json({
        success: true,
        message: "Đăng ký thành công",
        data: newUser})
    }catch(error){
        console.log(error);
        return res.status(400).json({
            success: false,
            message: 'Đăng ký thất bại'});
    }
}


export const loginUser = async (req, res)=>{
try{
     const {username, password} = req.body;
    const exitUser = await User.findOne({username});
    if(exitUser){
        const isMatch = await bcrypt.compare(password,exitUser.password);
        if(isMatch){
            const token = jwt.sign({
                id: exitUser._id,
               

            },process.env.JWT_SECRET,{
                expiresIn: '2h',
            });
            return res.status(200).json({
                success: true,
                message: 'Đăng nhập thành công',
                token: token,
            });
    } else {
        return res.status(400).json({message: 'Sai mật khẩu'});
    }
    return res.status(400).json({message: 'Sai tên người dùng'});

    
}
    }catch(error){
        console.log(error);
        return res.status(400).json({
            success: false,
            
            message: 'Đăng nhập thất bại'});
    }
}
export const getInforUser = async(req,res)=>{
    try{
        const { id} = req.user;
        const user = await User.findById(id).select('username role teamId');
        return res.status(200).json({
            success: true,
            message: 'Lấy thông tin người dùng thành công',
            user: {
                username: user.username,
                role: user.role,
                teamId: user.teamId
            }
            
        })
    }catch(error){
        return res.status(400).json({
            message: 'Lỗi khi lấy thông tin người dùng'
        })
    }


}
export const updateProfile = async (req, res)=>{
    try{
        const userId = req.user.id;
      
        const userUpdate = req.body;
        const user = await User.findByIdAndUpdate(
        userId,
        {
            $set: userUpdate,
        },{
            new: true,
            runValidators: true,
        }
        );
        if(!user){
            return res.status(400).json({
                message: 'Không tìm thấy người dùng'
            });
        }
        else return res.status(200).json({
            message: 'Update thành công',
            user: userUpdate
        })

    }catch(error){
return res.status(400).json({
    message: 'Lỗi',
})
    }
    


}
export const getAllUser = async (req, res)=>{
    try{
        const users = await User.find();
        if(users.length === 0){
            return res.status(404).json({
                message: 'Không có người dùng nào'
            });
        }
        return res.status(200).json({
            message: 'Lấy tất cả người dùng thành công',
            users: users.map(user => ({
                id: user._id,
                username: user.username,
                role: user.role,
                teamId: user.teamId
            }))
        });
    }catch(error){
        console.log(error);
        return res.status(400).json({
            message: 'Lỗi khi lấy tất cả người dùng'
        });
    }
}
export const deleteUser = async (req, res)=>{
    try{
        const { id } = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                message: 'ID không hợp lệ'
            });
        }
        const team = await Team.findOne({ members: id });
        team.members = team.members.filter(member => member.toString() !== id);
        await team.save();
        const user = await User.findByIdAndDelete(id);
        if(!user){
            return res.status(404).json({
                message: 'Không tìm thấy người dùng'
            });
        }
        return res.status(200).json({
            message: 'Xóa người dùng thành công',
            user: {
                id: user._id,
                username: user.username,
                role: user.role,
                teamId: user.teamId
            }
        });
    }catch(error){
        console.log(error);
        return res.status(400).json({
            message: 'Lỗi khi xóa người dùng'
        });
    }
}