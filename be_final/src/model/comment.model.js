import mongoose from 'mongoose'
const{Schemas, Types} = mongoose;
const commentSchema = new mongoose.Schema({
    content: String,
    taskId: {
        type: Types.ObjectId,
        required: true,
        ref: 'Task'
    }, 
    userId: {
        type: Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,

    }
});
const Comment = mongoose.model('Comment', commentSchema);
export default Comment;