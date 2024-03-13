import { Cascader, DatePicker, Input, TreeSelect } from "antd";
import { ControllerRenderProps } from "react-hook-form";
import ru from "antd/es/date-picker/locale/ru_RU";
import { Option, TreeSelectOption } from "../../../interfaces/Common";

interface ChooseInputProps {
  type: "phone" | "password" | "date" | "default" | "cascader" | "select";
  field: ControllerRenderProps<any, string>;
  options?: TreeSelectOption[];
}
const ruLocale: typeof ru = {
  ...ru,
  lang: {
    ...ru.lang,
    fieldDateFormat: "DD-MM-YYYY",
    yearFormat: "YYYY",
    cellYearFormat: "YYYY",
  },
};
export default function ChooseInput({
  type,
  field,
  options = [],
}: ChooseInputProps) {
  return (
    <>
      {type === "password" && (
        <Input.Password size="large" style={{ width: "250px" }} {...field} />
      )}
      {type === "phone" && (
        <Input
          size="large"
          style={{ width: "250px" }}
          addonBefore="+7"
          {...field}
        />
      )}
      {type === "default" && (
        <Input size="large" style={{ width: "250px" }} {...field} />
      )}
      {type === "date" && (
        <DatePicker
          locale={ruLocale}
          size="large"
          {...field}
          style={{ width: "200px" }}
          placeholder="Выберите дату"
        />
      )}
      {/* {type === "cascader" && (
        <Cascader
          size="large"
          options={options}
          {...field}
          style={{ width: "250px" }}
        />
      )} */}
      {type === "select" && (
        <TreeSelect
          style={{ width: "250px" }}
          size="large"
          dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
          placeholder="Выберите категорию"
          treeData={options}
          {...field}
        />
      )}
    </>
  );
}
