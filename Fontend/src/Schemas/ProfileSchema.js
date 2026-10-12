import * as yup from "yup"
const ProfileSchema = yup.object({
    name: yup
        .string()
        .min(3, "Vui lòng nhập trên 3 kí tự!")
        .max(50, "Tên của bạn quá dài!")
        .required("Vui lòng nhập tên"),
    email: yup
        .string()
        .email("Email của bạn không đúng định dạng(***@gmai.com)")
        .required("vui lòng nhập Email"),

})
export default ProfileSchema;