import Title from "antd/es/typography/Title";
import { InputField } from "../../../common/InputField/InputField";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { transformCategoriesTreeSelect } from "../../../../utils/functions/transformCategories";
import { Button } from "antd";
import { deleteCategory } from "../../../../store/categories/actions";

export default function AdminDeleteCategory() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const categories = useAppSelector((state) => state.categories.categories);
  const options = transformCategoriesTreeSelect(categories);
  const dispatch = useAppDispatch();
  const onSubmit = (data: any) => {
    dispatch(deleteCategory(data.deletingCategory));
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="admin-categories__update-category admin-category"
    >
      <Title level={4}>Удалить категорию</Title>
      <InputField
        type="select"
        control={control}
        inputName="deletingCategory"
        label="Выберите категорию"
        errors={errors}
        options={options}
      />
      <Button ghost danger htmlType="submit" size="large">
        Удалить
      </Button>
    </form>
  );
}
