import * as yup from "yup";

export const registrationPhoneSchema = yup.object().shape({
  phone: yup
    .string()
    .required("Введите телефон")
    .matches(/\d{10}/, "Неверный формат"),
});

export const registrationCodeSchema = yup.object().shape({
  code: yup
    .string()
    .required("Введите код")
    .matches(/\d{4}/, "Код из 4-х цифр"),
});

export const registrationPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required("Введите пароль")
    .min(8, "Не менее 8 символов"),
  "password-repeat": yup
    .string()
    .required("Введите пароль повторно")
    .oneOf([yup.ref("password")], "Пароли должны совпадать!"),
});
