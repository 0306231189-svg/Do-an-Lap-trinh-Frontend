import * as yup from "yup"
const AddTopicSchema = yup.object({
    title: yup
        .string()
        .max(100, "Tên của bạn quá dài!")
        .required("Vui lòng nhập tên"),
    content: yup
        .string(),
    topic: yup
        .string()
        .required()
        .oneOf(["hoc-tap", "cong-viec", "private"], "Chủ để không hợp lệ")
})
export default AddTopicSchema;