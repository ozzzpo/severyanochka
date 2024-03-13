import { Button, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { registrationPasswordSchema } from "../../../utils/validators/registrationSchema";
import { Nullable } from "../../../interfaces/Common";
import { onRegister } from "../../../store/auth/actions";
import { InputField } from "../../common/InputField/InputField";

export default function RegistrationPassword() {
  const dispatch = useAppDispatch();
  const phoneKey = useAppSelector((state) => state.phones.phoneKey.key);
  const phoneError = useAppSelector((state) => state.phones.error);
  const phoneStatus = useAppSelector((state) => state.phones.status);
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registrationPasswordSchema) });
  const [submitError, setSubmitError] = useState<Nullable<string>>(null);
  const onSubmit = async (data: any) => {
    const response = await dispatch(
      onRegister({
        phone_key: phoneKey,
        password: data.password,
      })
    );
    //@ts-ignore
    if (response.error) {
      setSubmitError("Что-то пошло не так");
    } else {
      navigate("/");
    }
  };

  return (
    <>
      {phoneStatus === "loading" ? (
        <Spin indicator={<LoadingOutlined style={{ fontSize: 80 }} spin />} />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="registration-form">
          <InputField
            type="password"
            control={control}
            errors={errors}
            inputName="password"
            label="Придумайте пароль"
          />

          <InputField
            type="password"
            control={control}
            errors={errors}
            inputName="password-repeat"
            label="Придумайте пароль"
          />

          <Button type="primary" htmlType="submit" size="large">
            Зарегистрироваться
          </Button>
        </form>
      )}
    </>
  );
}
