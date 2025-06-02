import mongoose from 'mongoose'

import Task from '../../model/task.model.js'


export const getTask = async (req,res)=>{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    try{
    const tasks = await Task.find().
        skip(skip).
        limit(limit).
        sort({createdAt: -1});

 return res.status(200).json({
        success: true,
        message: 'Lấy danh sách task thành công',
        tasks: tasks,
        page: page,
        limit: limit,
        total: await Task.countDocuments()
 });
    }catch(error){
        console.log(error);
        return res.status(400).json({
            message: 'Lỗi khi lấy danh sách task'
        })
    }
}
export const createTask = async (req,res)=>{
    try{
        const {title, description, dueTime, documentLink, githubRepo} = req.body;
        const creator = req.user.id;

        const newTask = new Task(
            {
                title: title,
                description: description,
                dueTime: dueTime,
                documentLink: documentLink,
                githubRepo: githubRepo,
                creator: creator   
            }
        );
        await newTask.save();
        return res.status(201).json({
            success: true,
            message: 'Tạo task thành công',
            task: newTask
        });
    }catch(error){
        console.log(error);
        return res.status(400).json({
            message: 'Lỗi khi tạo task'
        })
    }
}

export const getTaskById = async(req, res)=>{
    const taskId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
        return res.status(400).json({
            success: false,
            message: 'ID không hợp lệ'
        });
    }
    try{
        const task = await Task.findById(taskId);
        if(!task){
            return res.status(400).json({
                success: false,
                message: 'Không tìm thấy task'
            })
        }
        return res.status(200).json({
        success: true,
        message: "Lấy task thành công",
        data: task,
        id: taskId
    })
}catch(error){
    console.log(error);
    return res.status(400).json({
        success: false,
        message: 'Lỗi khi lấy task'

    })

}

}
export const updateTask = async(req,res)=>{
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            message: 'ID không hợp lệ'
        });
    };
   try{
     const task = await Task.findById(id);
    if(!task){
        return res.status(400).json({
            success: false,
            message: 'Không tìm thấy task'
        })
    }
    const updateTask = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
        id, 
        updateTask,
        {new: true, runValidators: true}
    )
    return res.status(200).json({
        success: true,
        message: 'Cập nhật task thành công',
        data: updatedTask
    });
   }catch(error){
        console.log(error);
        return res.status(400).json({
            success: false,
            message: 'Lỗi khi cập nhật task'
        })
    }           
   }
    
export const deleteTask = async (req,res)=>{
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            message: 'ID không hợp lệ'
        });
    }
    try{
        const task = await Task.findByIdAndUpdate(id);
        if(!task){
            return res.status(400).json({
                success: false,
                message: 'Không tìm thấy task'
            })
        }
        return res.status(200).json({
            success: true,
            message: 'Xóa task thành công',
            data: task});

    }catch(error){
console.log(error);
        return res.status(400).json({
            success: false,
            message: 'Lỗi khi xóa task'
        })
    }
}
export const addTasktoTeam = async (req, res)=>{
    const {teamId } = req.body;
    const {taskId}= req.params;
    if (!teamId || !taskId) {
        return res.status(400).json({
            success: false,
            message: 'ID nhóm và ID task là bắt buộc'
        });
    }
    try{
        const task = await Task.findByIdAndUpdate(
            taskId,
            {
                $set: { teamId: teamId }
            },
            {
                new: true,
                runValidators: true
            }
        );
        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy task'
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Thêm task vào nhóm thành công',
            data: task
        });

    

}catch(error){
        console.log(error);
        return res.status(400).json({
            success: false,
            message: 'Lỗi khi thêm task vào nhóm'
        });
    }
}