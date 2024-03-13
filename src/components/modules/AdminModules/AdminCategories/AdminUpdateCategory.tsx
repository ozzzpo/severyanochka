import Title from "antd/es/typography/Title";
import { InputField } from "../../../common/InputField/InputField";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { transformCategoriesTreeSelect } from "../../../../utils/functions/transformCategories";
import { Button } from "antd";
import { updateCategory } from "../../../../store/categories/actions";

export default function AdminUpdateCategory() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const categories = useAppSelector((state) => state.categories.categories);
  const options = transformCategoriesTreeSelect(categories);
  const updatingOptions = JSON.parse(JSON.stringify(options));
  options?.push({
    value: 0,
    title: "Корневая категория",
  });
  const dispatch = useAppDispatch();
  const onSubmit = (data: any) => {
    console.log(data);
    dispatch(
      updateCategory({
        updateId: data.updatingCategory,
        name: data.updatingCategoryNewName,
        parent_id: data.updatingCategoryNewParent,
      })
    );
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="admin-categories__update-category admin-category"
    >
      <Title level={4}>Изменить категорию</Title>
      <InputField
        type="select"
        control={control}
        inputName="updatingCategory"
        label="Выберите категорию"
        errors={errors}
        options={updatingOptions}
      />
      <InputField
        type="default"
        control={control}
        inputName="updatingCategoryNewName"
        label="Изменить имя"
        errors={errors}
      />
      <InputField
        type="select"
        control={control}
        inputName="updatingCategoryNewParent"
        label="Изменить родителя"
        errors={errors}
        options={options}
      />
      <Button type="primary" htmlType="submit" size="large">
        Изменить
      </Button>
    </form>
  );
}
