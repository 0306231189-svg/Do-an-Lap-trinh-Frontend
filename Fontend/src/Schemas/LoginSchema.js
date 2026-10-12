import * as yup from "yup"
const LoginSchema = yup.object({
    name: yup
        .string()
        .min(3, "Vui lòng nhập trên 3 kí tự!")
        .max(50, "Tên của bạn quá dài!")
        .required("Vui lòng nhập tên"),
    password: yup
        .string()
        .min(5, "Mật khẩu phải dài hơn 5 kí tự")
        .required("Vui lòng nhập mật khẩu"),
})
export default LoginSchema;