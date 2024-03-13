import Title from "antd/es/typography/Title";
import avatar from "/default-avatar.jpg";
import "./ProfileInfo.scss";
import { Button, Spin } from "antd";
import { useState } from "react";
import { Nullable } from "../../../../interfaces/Common";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { deleteAvatar, updateAvatar } from "../../../../store/user/actions";
import { deleteAppAvatar } from "../../../../store/user/reducer";
import { useMe } from "../../../../pages/Area/Area";
import { getTime } from "../../../../utils/functions/getTime";

export default function ProfileInfo() {
  const [currentAvatar, setCurrentAvatar] = useState<string | null | undefined>(
    null
  );
  const [avatarError, setAvatarError] = useState<Nullable<string>>(null);

  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.user.status);
  function previewAndValidateImage(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    const allowedFileTypes = ["image/png", "image/jpeg"];
    const size = file.size / 1024 / 1024;
    const format = file.type;
    reader.onload = (e) => {
      const image = new Image();
      //@ts-ignore
      image.src = e.target?.result;
      if (!allowedFileTypes.includes(format)) {
        setAvatarError("Неподдерживаемый формат");
        return;
      }
      if (size >= 10) {
        setAvatarError("Вес изображения - не больше 10мб");
        return;
      }
      image.onload = function () {
        const height = image.height;
        const width = image.width;
        if (height > 400 || width > 400) {
          setAvatarError("Максимальное разрешение - 400х400");
          return;
        }
        setCurrentAvatar(image.src);
        setAvatarError(null);
      };
    };
  }
  const handleAvatarChange = (avatar: File) => {
    previewAndValidateImage(avatar); // Ставит аватарку в режим "предпросмотра"
    if (!avatarError) {
      console.log("valid");
      const formData = new FormData();
      formData.append("avatar", avatar);
      dispatch(updateAvatar(formData));
    }
  };
  const handleAvatarDelete = () => {
    dispatch(deleteAvatar());
    dispatch(deleteAppAvatar());
    setAvatarError(null);
    setCurrentAvatar(null);
  };
  const { me } = useMe();
  const userAvatar = me.avatar_url
    ? `https://api.severyanochka.judle.ru/${me.avatar_url}`
    : null;
  console.log(userAvatar);
  return (
    <>
      <Title>Личная информация</Title>
      <div className="profile-info">
        <div className="profile-info__avatar">
          {status === "loading" ? (
            <Spin />
          ) : (
            <img src={currentAvatar || userAvatar || avatar} alt="#" />
          )}
          <label className="error-message">{avatarError}</label>
          <Button size="large" type="primary" style={{ position: "relative" }}>
            <label className="upload">
              <input
                type="file"
                onChange={(e) => {
                  e.target.files && handleAvatarChange(e.target.files[0]);
                }}
              />
            </label>
            {me.avatar_url ? "Изменить" : "Добавить"} фото
          </Button>

          {(me.avatar_url || currentAvatar) && (
            <Button size="large" danger onClick={() => handleAvatarDelete()}>
              Удалить фото
            </Button>
          )}
        </div>
        <div className="profile-info__content">
          <div className="profile-info__item">
            <Title level={3}>Имя</Title>
            <p>{me.first_name || "Не указано"}</p>
          </div>
          <div className="profile-info__item">
            <Title level={3}>Фамилия</Title>
            <p>{me.last_name || "Не указано"}</p>
          </div>
          <div className="profile-info__item">
            <Title level={3}>Дата рождения</Title>
            <p>{me.birthday ? getTime(me.birthday) : "Не указано"}</p>
          </div>
          <div className="profile-info__item">
            <Title level={3}>Номер телефона</Title>
            <p>{me.phone || "Не указано"}</p>
          </div>
          <div className="profile-info__item">
            <Title level={3}>Дата регистрации</Title>
            <p>{getTime(me.created_at) || "Не указано"}</p>
          </div>
        </div>
      </div>
    </>
  );
}
