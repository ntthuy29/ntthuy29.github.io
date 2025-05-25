import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
        usename: {
            type: String,
            required: true,
        },
        password: {
            type: String, 
            required: true,
            
        },
        role:{
            type: String,
            enum: ['Admin','Member'],
            default: 'Member',
        },
        teamId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Team',
        }

    }
)
const User = mongoose.model('User', userSchema);
export default User;