import { Avatar, Button, Dropdown, Space } from "antd";
import {
  DownOutlined,
  HeartOutlined,
  InboxOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import Search from "antd/es/input/Search";
import avatar from "/default-avatar.jpg";
import { User } from "../../../interfaces/User";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import logo from "/new-font-logo-removebg-preview.png";
import "./Header.scss";
import { headerDropdownItems } from "../../../utils/constants/headerDropdownItems";
import { logout } from "../../../store/auth/reducer";
import HeaderCategoriesDropdown from "../../modules/HeaderCategoriesDropdown/HeaderCategoriesDropdown";
interface HeaderProps {
  me: User;
}

export default function Header({ me }: HeaderProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const items = headerDropdownItems(dispatch, logout, me);
  const userAvatar = me.avatar_url
    ? `https://api.severyanochka.judle.ru/${me.avatar_url}`
    : null;
  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <HeaderCategoriesDropdown />
      <Search
        className="header__search"
        placeholder="Найти товар"
        size="large"
      />
      <div className="header__icons">
        <div className="header__icon">
          <HeartOutlined className="icon" />
          <label>Избранное</label>
        </div>
        <div className="header__icon">
          <InboxOutlined className="icon" />
          <label>Заказы</label>
        </div>
        <div className="header__icon">
          <ShoppingCartOutlined className="icon" />
          <label>Корзина</label>
        </div>
      </div>
      <div className="header__profile">
        {isAuth ? (
          <>
            <Dropdown menu={{ items }} className="header__dropdown">
              <a onClick={(e) => e.preventDefault()}>
                <Avatar icon={<UserOutlined />} src={userAvatar} />
                <Space>
                  {me.first_name || "Без имени"}
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </>
        ) : (
          <Button
            size="large"
            ghost
            type="primary"
            onClick={() => navigate("/login")}
          >
            Войти
          </Button>
        )}
      </div>
    </header>
  );
}
