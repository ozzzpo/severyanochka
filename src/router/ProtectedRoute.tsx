import { PropsWithChildren, useEffect } from "react";
import { useAppSelector } from "../store/store";
import { useLocation, useNavigate } from "react-router-dom";

interface ProtectedRouteProps extends PropsWithChildren {}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const isAdmin = useAppSelector((state) => state.user.user.is_superuser);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth) {
      navigate("/login", { replace: true });
    }
    if (location.pathname === "/admin" && !isAdmin) {
      //@ts-ignore
      navigate(-1, { replace: true });
    }
  }, [isAuth, isAdmin, navigate]);
  return children;
}
