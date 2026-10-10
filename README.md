# Đồ án Lập trình Frontend

## Note Manager Backend

Backend API cho hệ thống quản lý ghi chú, sử dụng Node.js, Express và JSON file.

## Yêu cầu

* Node.js 16 trở lên (khuyến nghị bản LTS hiện hành).
* npm.

## Cài đặt và chạy

```bash
npm install
npm start
```

Mặc định backend chạy tại `http://localhost:5000`.

## API chính

* `GET /api/health`
* `GET /api/profile` và `PUT /api/profile`
* `GET/POST /api/notes/:topic`
* `PUT/DELETE /api/notes/:topic/:id`
* `POST /api/private/auth`
* `GET/POST /api/private/notes`
* `PUT/DELETE /api/private/notes/:id`

Các API ghi chú riêng tư yêu cầu header `Authorization: Bearer <token>`. Lấy token từ `POST /api/private/auth` sau khi gửi `{ "password": "..." }`. Token hết hạn sau 2 giờ và sẽ bị xóa khi backend khởi động lại.

## Dữ liệu

Backend tự tạo thư mục `data/` và các file JSON còn thiếu. Không xóa `data/` khi ứng dụng đang sử dụng. `GET /api/profile` không trả mật khẩu; trường `hasPassword` chỉ cho biết đã thiết lập mật khẩu hay chưa.

## Lưu ý tích hợp Frontend

Sau khi xác thực thành công, frontend cần lưu token trong state và gửi header `Authorization: Bearer <token>` cho mọi yêu cầu `/api/private/notes`. Khi reload trang, backend không còn giữ token cũ nên người dùng phải mở khóa lại.
