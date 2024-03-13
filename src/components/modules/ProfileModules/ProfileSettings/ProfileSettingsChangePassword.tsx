import Title from "antd/es/typography/Title";
import { useForm } from "react-hook-form";
import { Button } from "antd";
import { InputField } from "../../../common/InputField/InputField";

export default function ProfileSettingsChangePassword() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <form
      className="profile-settings__password-change"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Title level={3}>Сменить пароль</Title>
      <InputField
        type="password"
        control={control}
        inputName="password"
        label="Введите новый пароль"
        errors={errors}
      />
      <InputField
        type="password"
        control={control}
        inputName="password-repeat"
        label="Повторите пароль"
        errors={errors}
      />
      <Button ghost type="primary" htmlType="submit" size="large">
        Сохранить
      </Button>
    </form>
  );
}
