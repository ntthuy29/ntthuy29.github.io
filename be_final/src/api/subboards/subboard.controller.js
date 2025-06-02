import Task from "../../model/task.model.js";
import SubBoard from "../../model/subBoard.model.js";
export const addBoard = async(req, res) => {
    const {name } = req.body;
    const {taskId} = req.params;
    console.log(name, taskId);
    if (!name || !taskId) {
        return res.status(400).json({
            success: false,
            message: 'Tên bảng và ID task là bắt buộc'
        });
    }
    try{
       
        const newBoard = new SubBoard({
        name: name,
        taskId: taskId
    });
      await newBoard.save();
const task = await Task.findByIdAndUpdate(
    taskId,
    {
        $push: { subBoards: newBoard._id } // chỉ push _id
    },
    {
        new: true,
        runValidators: true
    }
).populate('subBoards');
await task.save();
        return res.status(200).json({
            success: true,
            message: 'Tạo bảng thành công',
            data: task,
           
        });
    
    }catch(error){
        console.log(error);
        return res.status(400).json({
            success: false,
            message: 'Lỗi khi tạo bảng'
        });
    }

}

export const updateSubBoard = async(req, res) => {
  try {
   const { idSB } = req.params;
    console.log(idSB);
    const updateSubBoard = req.body;

    if (!idSB) {
      return res.status(400).json({
        success: false,
        message: 'ID bảng là bắt buộc'
      });
    }

    const updateDB = await SubBoard.findByIdAndUpdate(
      idSB,
      updateSubBoard,
      {
        new: true,
        runValidators: true
      }
    );

    if (!updateDB) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy bảng'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Cập nhật bảng thành công',
      data: updateDB.toObject() 
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi khi cập nhật bảng',
      error: error.message
    });
  }
};

export const deleteSubBoard = async(req, res)=>{
    const {idSB} = req.params;
    if (!idSB) {
        return res.status(400).json({
            success: false,
            message: 'ID bảng là bắt buộc'
        });
    }
    try{
        const subBoard = await SubBoard.findByIdAndDelete(idSB);
        if(!subBoard){
            return res.status(400).json({
                success: false, 
                message: 'Không tìm thấy bảng'
            })
        }
        const task = await Task.findOneAndUpdate(
            subBoard.taskId,
            {
                
                $pull: { subBoards: idSB } // xoa bang khoi task
            }
            ,
            {
                new: true,
                runValidators: true
            }


           );
           return res.status(200).json({
            success: true,
            message: 'Xóa bảng thành công',
            data: subBoard
              });
    }catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi khi xóa bảng',
            error: error.message
        });
    }
}
export const uploadFileImg = async (req, res) => {
  try {
    const { idSB } = req.params;
console.log(idSB);
    if (!req.file || !req.file.path) {
      return res.status(400).json({ success: false, message: 'Không có ảnh được upload' });
    }

    const imageUrl = req.file.path;

    const updated = await SubBoard.findByIdAndUpdate(
      idSB,
      { background: imageUrl },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy SubBoard' });
    }

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
};
