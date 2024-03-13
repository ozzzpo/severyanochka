import { MenuProps } from "antd";
import { Category } from "../../interfaces/Categories";
import { Link } from "react-router-dom";
import { Option, TreeSelectOption } from "../../interfaces/Common";
export function transformCategoriesDropdown(categories: Category[]) {
  const items: MenuProps["items"] = [];
  if (!categories) {
    return;
  }
  if (!categories.length) {
    return;
  }
  categories.forEach((category) => {
    items.push({
      key: category.id,
      label: <Link to={`categories/${category.name}`}>{category.name}</Link>,
      children: transformCategoriesDropdown(category.child),
    });
  });

  return items;
}
export function transformCategoriesCascader(categories: Category[]) {
  const items: Option[] = [];
  if (!categories) {
    return;
  }
  categories.forEach((category) => {
    items.push({
      value: category.id,
      label: category.name,
      children: transformCategoriesCascader(category.child),
    });
  });

  return items;
}

export function transformCategoriesTreeSelect(categories: Category[]) {
  const items: TreeSelectOption[] = [];
  if (!categories) {
    return;
  }
  categories.forEach((category) => {
    items.push({
      value: category.id,
      title: category.name,
      children: transformCategoriesTreeSelect(category.child),
    });
  });

  return items;
}
