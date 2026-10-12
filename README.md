# ĐỒ ÁN MÔN HỌC: ỨNG DỤNG QUẢN LÝ GHI CHÚ

Công nghệ: ReactJS (Vite) & Node.js (Express)

## Thông Tin Chung

- **Giảng viên hướng dẫn:** [Tên giảng viên]
- **Nhóm thực hiện:** Nhóm [Số nhóm]

### Thành viên nhóm

| STT | Họ và tên | Mã SV | Vai trò |
| --- | --- | --- | --- |
| 1 | [Họ tên] | [Mã SV] | PM & QA |
| 2 | [Họ tên] | [Mã SV] | Frontend Developer |
| 3 | [Họ tên] | [Mã SV] | Backend Developer |

## Công Nghệ Sử Dụng

- **Frontend:** ReactJS (Vite), React Router DOM
- **Backend:** Node.js, Express.js
- **Cơ sở dữ liệu:** File System (Lưu trữ bằng định dạng `.json`)

## Yêu Cầu Môi Trường

- **Node.js:** Phiên bản v16 trở lên

## Hướng Dẫn Cài Đặt & Chạy Dự Án

*Lưu ý: Dự án chia làm 2 phần chạy độc lập. Vui lòng mở 2 cửa sổ Terminal để khởi động song song.*

### 1. Khởi động Backend (Máy chủ API)

Mở Terminal 1 và chạy các lệnh:

```bash
cd backend
npm install
node server.js
```

- **Địa chỉ:** `http://localhost:5000`
- **Lưu ý:** Hệ thống sẽ tự động tạo thư mục `data/` chứa các file JSON. Vui lòng không xóa thư mục này khi đang chạy ứng dụng.

### 2. Khởi động Frontend (Giao diện)

Mở Terminal 2 và chạy các lệnh:

```bash
cd frontend
npm install
npm run dev
```

- **Địa chỉ:** `http://localhost:5173` (hoặc cổng khác hiển thị ở terminal)
- **Trình duyệt:** Khuyến nghị dùng Google Chrome.

## Tài Khoản & Mật Khẩu Demo

- **Đăng nhập:** Ứng dụng không yêu cầu đăng nhập tài khoản.
- **Ghi chú riêng tư:** Vào menu "Cài đặt" trên giao diện để tạo mật khẩu mới.
