import Team from "../../model/team.model.js";
import User from "../../model/user.model.js";
export const createTeam = async(req, res) => {
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
    const {id} = req.body;
    const { teamId } = req.params;
    if (!id || !teamId) {
        return res.status(400).json({
            success: false,
            message: 'ID người dùng và ID nhóm là bắt buộc'
        });
    }
    try {
        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy nhóm'
            });
        }
        if (team.members.includes(id)) {
            return res.status(400).json({
                success: false,
                message: 'Người dùng đã là thành viên của nhóm'
            });
        }
        team.members.push(id);
        await team.save();  
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy người dùng'
            });
        }
        user.teamId = teamId;
        await user.save();
        return res.status(200).json({
            success: true,
            message: 'Thêm người dùng vào nhóm thành công',
            data: team
        });

}

catch (error) {
    console.error(error);
    return res.status(500).json({
        success: false,
        message: 'Lỗi khi thêm người dùng vào nhóm',
        error: error.message
    }); 
}
}
export const removeUser = async(req, res) => { 
    const {id} = req.body;
    const {teamId } = req.params;
    if (!id || !teamId) {
        return res.status(400).json({
            success: false,
            message: 'ID người dùng và ID nhóm là bắt buộc'
        });
    }
    try {
        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy nhóm'
            });
        }
        if (!team.members.includes(id)) {
            return res.status(400).json({
                success: false,
                message: 'Người dùng không phải là thành viên của nhóm'
            });
        }
        team.members = team.members.filter(memberId => memberId.toString() !== id);
        await team.save();
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy người dùng'
            });
        }
        user.teamId = null; 
        await user.save();
        return res.status(200).json({
            success: true,
            message: 'Xóa người dùng khỏi nhóm thành công',
            data: team
        });

    }catch(error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi khi xóa người dùng khỏi nhóm',
            error: error.message
        });
    }
}


export const deleteTeam = async(req, res) => {
    const { id } = req.params;
    
    if (!id) {
        return res.status(400).json({
            success: false,
            message: 'ID team là bắt buộc'
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
export const getAllTeams = async(req, res) => {
    try {
        const teams = await Team.find();
        return res.status(200).json({
            success: true,
            message: 'Lấy danh sách nhóm thành công',
            data: teams
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi khi lấy danh sách nhóm',
            error: error.message
        });
    }
}
export const membersOfTeam = async(req, res) => {
    const { teamId } = req.params;
    
    if (!teamId) {
        return res.status(400).json({
            success: false,
            message: 'ID nhóm là bắt buộc'
        });
    }
    
    try {
        const team = await Team.findById(teamId).populate('members', 'username role');
        
        if (!team) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy nhóm'
            });
        }
        
        return res.status(200).json({
            success: true,
            message: 'Lấy danh sách thành viên nhóm thành công',
            data: team.members
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi khi lấy danh sách thành viên nhóm',
            error: error.message
        });
    }
}
export const updateTeam = async(req, res) => {
    const { id } = req.params;
    const updatedTeam= req.body;
    
    if (!id) {
        return res.status(400).json({
            success: false,
            message: 'ID nhóm là bắt buộc'
        });
    }
    
    try {
        const team = await Team.findByIdAndUpdate(
            id,
            updatedTeam,
            {
                new: true,
                runValidators: true
            }
        );
        
        if (!team) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy nhóm'
            });
        }
        
        return res.status(200).json({
            success: true,
            message: 'Cập nhật nhóm thành công',
            data: team
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi khi cập nhật nhóm',
            error: error.message
        });
    }
}


