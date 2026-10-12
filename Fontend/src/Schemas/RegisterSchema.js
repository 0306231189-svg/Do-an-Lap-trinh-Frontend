import * as yup from "yup"
const RegisterSchema = yup.object({
    name: yup
        .string()
        .min(4, "Vui lòng nhập trên 3 kí tự!")
        .max(50, "Tên của bạn quá dài!")
        .required("Vui lòng nhập tên"),
    email: yup
        .string()
        .email("Email của bạn không đúng định dạng(***@gmai.com)")
        .required("vui lòng nhập Email"),
    password: yup
        .string()
        .min(6, "Mật khẩu phải dài hơn 5 kí tự")
        .required("Vui lòng nhập mật khẩu"),
    confirmpassword: yup
        .string()
        .required()
        .oneOf([yup.ref("password")], "Mật khẩu không khớp")
})
export default RegisterSchema;