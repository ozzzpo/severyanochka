import { Button, Form, Input } from "antd";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import AntLink from "antd/es/typography/Link";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { onLogin } from "../../store/auth/actions";
import "./Login.scss";
import { Controller, useForm } from "react-hook-form";
import { loginSchema } from "../../utils/validators/loginSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputField } from "../../components/common/InputField/InputField";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });
  const onSubmit = async (data: any) => {
    const response = await dispatch(
      onLogin({
        username: `+7${data.phone}`,
        password: data.password,
      })
    );
    // @ts-ignore
    if (response.error) {
      // @ts-ignorer
      console.log(response.error);
      setError("phone", {
        message: "Неверный логин или пароль",
      });
      setError("password", {
        message: "Неверный логин или пароль",
      });
    } else {
      navigate("/");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="login">
      <Title>Войти в аккаунт</Title>
      <InputField
        type="phone"
        inputName="phone"
        control={control}
        errors={errors}
        label="Номер телефона"
      />
      <InputField
        type="password"
        inputName="password"
        control={control}
        errors={errors}
        label="Пароль"
      />

      <Button type="primary" htmlType="submit" size="large">
        Войти
      </Button>

      <Text>
        Нет аккаунта?{" "}
        <AntLink>
          <Link to="/registration">Зарегистрироваться</Link>
        </AntLink>
      </Text>
    </form>
  );
}
