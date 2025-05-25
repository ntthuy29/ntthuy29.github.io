import mongoose from 'mongoose'
const {Schemas, Types} = mongoose;
const subBoardSchema = new mongoose.Schema({
    name: String,
    taskId: {
        type: Types.ObjectId,
        ref: 'Task',
    },
    background: String,
});
const SubBoard = mongoose.model('SubBoard', subBoardSchema);
export default SubBoard;
