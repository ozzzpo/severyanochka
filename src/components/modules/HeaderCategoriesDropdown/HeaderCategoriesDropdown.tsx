import { MenuOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import { useAppSelector } from "../../../store/store";
import { transformCategoriesDropdown } from "../../../utils/functions/transformCategories";

export default function HeaderCategoriesDropdown() {
  const categories = useAppSelector((state) => state.categories.categories);
  const items = transformCategoriesDropdown(categories);

  return (
    <Dropdown menu={{ items }}>
      <Button type="primary" size="large">
        <MenuOutlined />
        Каталог
      </Button>
    </Dropdown>
  );
}
