import Title from "antd/es/typography/Title";
import "./AdminCategories.scss";
import { InputField } from "../../../common/InputField/InputField";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { transformCategoriesTreeSelect } from "../../../../utils/functions/transformCategories";
import { Button } from "antd";
import { createCategory } from "../../../../store/categories/actions";
import { createAppCategory } from "../../../../store/categories/reducer";
import AdminUpdateCategory from "./AdminUpdateCategory";
import AdminDeleteCategory from "./AdminDeleteCategory";
export default function AdminCategories() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useAppDispatch();
  const onSubmit = (data: any) => {
    console.log(data);
    dispatch(
      createCategory({
        name: data.categoryName,
        parent_id: data.categoryParent === 0 ? null : data.categoryParent,
      })
    );
    dispatch(
      createAppCategory({
        name: data.categoryName,
        parent_id: data.categoryParent[0] === 0 ? null : data.categoryParent[0],
      })
    );
  };
  const categories = useAppSelector((state) => state.categories.categories);
  const options = transformCategoriesTreeSelect(categories);
  options?.push({
    value: 0,
    title: "Корневая категория",
  });
  return (
    <>
      <Title level={3}>Редактирование категорий</Title>
      <div className="admin-categories">
        <form
          className="admin-categories__add-category admin-category"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Title level={4}>Добавить категорию</Title>
          <InputField
            type="default"
            inputName="categoryName"
            label="Имя категории"
            control={control}
            errors={errors}
          />
          <InputField
            type="select"
            inputName="categoryParent"
            label="Родительская категория"
            control={control}
            errors={errors}
            options={options}
          />
          <Button type="primary" size="large" htmlType="submit">
            Добавить
          </Button>
        </form>
        <div className="admin-categories__update-category">
          <AdminUpdateCategory />
        </div>
        <div className="admin-categories__delete-category">
          <AdminDeleteCategory />
        </div>
      </div>
    </>
  );
}
