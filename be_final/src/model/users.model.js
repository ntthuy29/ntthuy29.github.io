import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
        username: {
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
            required: false,
        }

    }
)
const User = mongoose.model('User', userSchema);
export default User;