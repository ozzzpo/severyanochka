import "./InputField.scss";
import { Control, Controller } from "react-hook-form";
import ChooseInput from "./ChooseInput";
import { Option, TreeSelectOption } from "../../../interfaces/Common";
interface InputProps {
  control: Control<any>;
  inputName: string;
  label: string;
  errors: any;
  type: "phone" | "password" | "date" | "default" | "cascader" | "select";
  options?: TreeSelectOption[];
}

export const InputField = ({
  inputName,
  label,
  control,
  errors,
  type,
  options = [],
}: InputProps) => {
  return (
    <div className="custom-input">
      <label className="custom-input__label">{label}</label>
      <Controller
        name={inputName}
        control={control}
        render={({ field }) => (
          <ChooseInput type={type} field={field} options={options} />
        )}
      />
      <label className="custom-input__errors">
        {errors[inputName]?.message}
      </label>
    </div>
  );
};
