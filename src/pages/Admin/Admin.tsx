import {
  AppstoreOutlined,
  ClockCircleOutlined,
  GoldOutlined,
} from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useMe } from "../Area/Area";
import "./Admin.scss";
const items: MenuProps["items"] = [
  {
    label: <Link to="orders">Заказы</Link>,
    key: "orders",
    icon: <GoldOutlined />,
  },
  {
    label: <Link to="categories">Категории</Link>,
    key: "categories",
    icon: <AppstoreOutlined />,
  },

  {
    label: <Link to="moderation">Модерация</Link>,
    key: "moderation",
    icon: <ClockCircleOutlined />,
  },
];
export default function Admin() {
  const location = useLocation();
  console.log(location.pathname.slice(7));
  const me = useMe();
  return (
    <div className="admin">
      <div className="admin__menu">
        <Menu
          items={items}
          mode="horizontal"
          selectedKeys={[location.pathname.slice(7)]}
          defaultSelectedKeys={["orders"]}
        />
      </div>
      <div className="admin__content">
        <Outlet context={me} />
      </div>
    </div>
  );
}
