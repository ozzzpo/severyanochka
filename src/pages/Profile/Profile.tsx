import { Menu } from "antd";

import "./Profile.scss";
import { items } from "../../utils/constants/profileMenuItems";
import { Outlet, useLocation } from "react-router-dom";
import { useMe } from "../Area/Area";
export default function Profile() {
  const location = useLocation();
  const parsedLocation = location.pathname.slice(9);
  const me = useMe();
  return (
    <div className="profile">
      <div className="profile__sidebar">
        <Menu
          selectedKeys={[parsedLocation]}
          mode="inline"
          items={items}
          style={{ width: "100%" }}
        />
      </div>
      <div className="profile__content">
        <Outlet context={me} />
      </div>
    </div>
  );
}
