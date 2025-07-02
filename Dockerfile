# Sử dụng image node chính thức
FROM node:18

# Tạo thư mục làm việc trong container
WORKDIR /app

# Copy package.json trước để cài trước
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ code vào container
COPY . .

# Build nếu là frontend (React, Vue)
# RUN npm run build

# Mở port 3000 (hoặc cổng bạn dùng)
EXPOSE 3000

# Câu lệnh khởi động
CMD ["npm", "start"]
