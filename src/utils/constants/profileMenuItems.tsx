import {
  DollarOutlined,
  InfoCircleOutlined,
  SettingOutlined,
  TruckOutlined,
} from "@ant-design/icons";
import { MenuProps } from "antd";
import { Link } from "react-router-dom";

export const items: MenuProps["items"] = [
  {
    label: <Link to="info">Личные данные</Link>,
    key: "info",
    icon: <InfoCircleOutlined />,
  },
  {
    label: <Link to="delivery">Адреса доставки</Link>,
    key: "delivery",
    icon: <TruckOutlined />,
  },
  {
    label: <Link to="payment">Способы оплаты</Link>,
    key: "payment",
    icon: <DollarOutlined />,
  },
  {
    label: <Link to="settings">Настройки</Link>,
    key: "settings",
    icon: <SettingOutlined />,
  },
];
