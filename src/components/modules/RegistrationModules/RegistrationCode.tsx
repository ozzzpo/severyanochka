import { Button, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { registrationCodeSchema } from "../../../utils/validators/registrationSchema";
import { verifyPhoneKey } from "../../../store/phones/actions";
import { InputField } from "../../common/InputField/InputField";

export default function RegistrationCode({ onSub }: { onSub: any }) {
  const dispatch = useAppDispatch();
  const phoneKey = useAppSelector((state) => state.phones.phoneKey.key);
  const phoneStatus = useAppSelector((state) => state.phones.status);
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registrationCodeSchema) });
  const onSubmit = async (data: any) => {
    const response = await dispatch(
      verifyPhoneKey({
        phone_key: phoneKey,
        code: data.code,
      })
    );
    //@ts-ignore
    if (response.error) {
      console.log(response);
      setError("code", {
        message: "Не удалось верифицировать код",
      });
    } else {
      onSub("password");
    }
  };

  return (
    <>
      {phoneStatus === "loading" ? (
        <Spin indicator={<LoadingOutlined style={{ fontSize: 80 }} spin />} />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="registration-form">
          <InputField
            type="default"
            control={control}
            errors={errors}
            inputName="code"
            label="Введите код из СМС"
          />

          <Button type="primary" htmlType="submit" size="large">
            Подтвердить
          </Button>
        </form>
      )}
    </>
  );
}
