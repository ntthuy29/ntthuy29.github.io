import Comment from '../../model/comment.model.js';
import Task from '../../model/task.model.js';


export const createComment = async(req, res)=>{
     const {taskId } = req.params;
     const { content } = req.body;
        if (!taskId || !content) {
            return res.status(400).json({
                success: false,
                message: 'ID task và nội dung bình luận là bắt buộc'
            });
        }
    try{
        const newComment = new Comment({
            content: content, 
            taskId: taskId, 
            userId: req.user.id,
            createdAt: new Date()
        })
        await newComment.save();
        const task = await Task.findByIdAndUpdate(
            taskId,
            {
                $push: { comments: newComment._id } // chỉ push _id
            },
            {
                new: true,
                runValidators: true
            }
        ).populate('comments');
        return res.status(200).json({
            success: true,
            message: 'Tạo bình luận thành công',
            data: task,
        });


    }catch(error){
        console.log(error);
        return res.status(400).json({
            success: false,
            message: 'Lỗi khi tạo bình luận'
        });
    }

}

export const getCommentonTask = async(req, res)=>{

    const {taskId} = req.params;
    if (!taskId) {
        return res.status(400).json({
            success: false,
            message: 'ID task là bắt buộc'
        });
    }
    try{
        const task = await Task.findById(taskId).populate('comments');
        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy task'
            });
        }
        return res.status(200).json({
            success: true,
            data: task
        });
    }catch(error){
        console.log(error);
        return res.status(400).json({
            success: false,
            message: 'Lỗi khi lấy bình luận'
        });
    }
}