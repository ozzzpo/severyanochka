import Title from "antd/es/typography/Title";
import { useForm } from "react-hook-form";

import { Button } from "antd";
import "./ProfileSettings.scss";
import ProfileSettingsChangePassword from "./ProfileSettingsChangePassword";

import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateMeSchema } from "../../../../utils/validators/updateMeSchema";
import { useAppDispatch } from "../../../../store/store";
import { updateMe } from "../../../../store/user/actions";
import { updateAppUser } from "../../../../store/user/reducer";
import { InputField } from "../../../common/InputField/InputField";

export default function ProfileSettings() {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(updateMeSchema) });
  const dispatch = useAppDispatch();
  const onSubmit = (data: any) => {
    dispatch(
      updateMe({
        first_name: data.firstName,
        last_name: data.lastName,
        birthday: data?.birthday
          ? data.birthday.toISOString().slice(0, 10)
          : undefined,
      })
    );
    dispatch(
      updateAppUser({
        first_name: data.firstName,
        last_name: data.lastName,
        birthday: data?.birthday
          ? data.birthday.toISOString().slice(0, 10)
          : undefined,
      })
    );

    navigate("/profile/info");
  };
  return (
    <>
      <Title>Настройки профиля</Title>
      <div className="profile-settings">
        <form
          className="profile-settings__form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Title level={3}>Изменить данные</Title>
          <InputField
            type="default"
            control={control}
            inputName="firstName"
            label="Имя"
            errors={errors}
          />
          <InputField
            type="default"
            control={control}
            inputName="lastName"
            label="Фамилия"
            errors={errors}
          />
          <InputField
            type="date"
            control={control}
            inputName="birthday"
            label="День рождения"
            errors={errors}
          />
          <Button type="primary" htmlType="submit" size="large">
            Сохранить
          </Button>
        </form>
        <ProfileSettingsChangePassword />
      </div>
    </>
  );
}
