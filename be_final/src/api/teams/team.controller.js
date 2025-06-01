import Team from "../../model/team.model.js";
export const addTeam = async(req, res) => {
    const { name, description } = req.body;
    
    if (!name || !description) {
        return res.status(400).json({
            success: false,
            message: 'Tên và mô tả là bắt buộc'
        });
    }
    
    try {
        const newTeam = new Team({
            name: name,
            description: description
        });
    
        await newTeam.save();
    
        return res.status(201).json({
            success: true,
            message: 'Tạo nhóm thành công',
            data: newTeam
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi khi tạo nhóm',
            error: error.message
        });
    }
}
export const addUser= async(req, res) => {
    const { name, description } = req.body;
    
    if (!name || !description) {
        return res.status(400).json({
        success: false,
        message: 'Tên và mô tả là bắt buộc'
        });
    }
    
    try {
        const newTeam = new Team({
        name: name,
        description: description
        });
    
        await newTeam.save();
    
        return res.status(201).json({
        success: true,
        message: 'Tạo nhóm thành công',
        data: newTeam
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
        success: false,
        message: 'Lỗi khi tạo nhóm',
        error: error.message
        });
    }
}

export const deleteUser = async(req, res) => {
    const { id } = req.params;
    
    if (!id) {
        return res.status(400).json({
            success: false,
            message: 'ID người dùng là bắt buộc'
        });
    }
    
    try {
        const team = await Team.findByIdAndDelete(id);
        
        if (!team) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy nhóm'
            });
        }
        
        return res.status(200).json({
            success: true,
            message: 'Xóa nhóm thành công',
            data: team
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi khi xóa nhóm',
            error: error.message
        });
    }
};

