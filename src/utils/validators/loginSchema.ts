import * as yup from "yup";

export const loginSchema = yup.object().shape({
  phone: yup
    .string()
    .required("Введите телефон")
    .matches(/\d{10}/, "Неверный формат"),
  password: yup
    .string()
    .required("Введите пароль")
    .min(8, "Минимум 8 символов"),
});
