import { Button } from "antd";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "../../../store/store";
import { registrationPhoneSchema } from "../../../utils/validators/registrationSchema";
import { createPhoneKey } from "../../../store/phones/actions";
import { InputField } from "../../common/InputField/InputField";
export default function RegistrationPhone({ onSub }: { onSub: any }) {
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registrationPhoneSchema) });

  const onSubmit = async (data: any) => {
    const response = await dispatch(createPhoneKey(`+7${data.phone}`));
    // @ts-ignore
    if (response.error) {
      setError("phone", {
        message: "Не удалось отправить код",
      });
    } else {
      onSub("code");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="registration-form">
      <InputField
        type="phone"
        inputName="phone"
        control={control}
        label="Введите номер телефона"
        errors={errors}
      />

      <Button type="primary" htmlType="submit" size="large">
        Отправить код
      </Button>
    </form>
  );
}
