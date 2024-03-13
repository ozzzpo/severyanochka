import { FormOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";
import { Link } from "react-router-dom";
import { User } from "../../interfaces/User";
export function headerDropdownItems(dispatch: any, logout: any, me: User) {
  const headerDropdownItems: MenuProps["items"] = [
    {
      key: "1",
      label: <Link to="/profile/info">Профиль</Link>,
      icon: <UserOutlined />,
    },
    {
      key: "2",
      label: <Link to="/admin/orders">Админ-панель</Link>,
      icon: <FormOutlined />,
    },
    {
      key: "3",
      danger: true,
      label: <a onClick={() => dispatch(logout())}>Выйти</a>,
      icon: <LogoutOutlined />,
    },
  ];
  if (!me.is_superuser) {
    return headerDropdownItems.filter((item) => item?.key !== "2");
  }
  return headerDropdownItems;
}
