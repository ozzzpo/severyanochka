import { useEffect } from "react";
import Header from "../../components/layout/Header/Header";
import "./Area.scss";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getAllCategories } from "../../store/categories/actions";
import { Outlet, useOutletContext } from "react-router-dom";
import Footer from "../../components/layout/Footer/Footer";
import { User } from "../../interfaces/User";
import { Divider } from "antd";
export interface ContextUser {
  me: User;
}
export default function Area() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);
  const user = useAppSelector((state) => state.user.user);
  const me: User = {
    ...user,
  };
  return (
    <>
      <div className="container">
        <Header me={{ ...me }} />
        <Divider />
        <main>
          <Outlet context={{ me } satisfies ContextUser} />
        </main>
        <Divider />
      </div>
      <Footer />
    </>
  );
}

export const useMe = () => {
  return useOutletContext<ContextUser>();
};
