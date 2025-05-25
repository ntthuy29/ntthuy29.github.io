import mongoose from "mongoose"
const {Schema, Types} = mongoose;
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    dueTime: {
        type: Date,

    },
    documentLink: {
        type: String,
    },
    githubRepo: {
        type: String,
    },
    creator: {
        type: Types.ObjectId,
        ref: 'User'
    },
    teamId: {
        type: Types.ObjectId,
        ref: 'Team'
    },
    subBoards: [
        {
            type: Types.ObjectId,
            ref: 'SubBoard',
        }
    ],
    comments: [{
        type: Types.ObjectId,
        ref: 'Comment'
    }],
    createAt: {
        type: Date,
        default: Date.now,
    }

});
const Task = mongoose.model('Task', taskSchema);
export default Task;