import mongoose from 'mongoose'
const connectDB = async()=>{
    try{
        await mongoose.connect('mongodb://localhost:27017/task_management');
        console.log('Kết nối thành công');
    }catch(err){
        console.error("Lỗi không thể kết nối", err.message);
        process.exit(1);
    }

};
export default connectDB;