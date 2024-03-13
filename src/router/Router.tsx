import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Area from "../pages/Area/Area";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
import Main from "../pages/Main/Main";
import Profile from "../pages/Profile/Profile";
import ProtectedRoute from "./ProtectedRoute";
import ProfileInfo from "../components/modules/ProfileModules/ProfileInfo/ProfileInfo";
import ProfileDeliveryAddresses from "../components/modules/ProfileModules/ProfileDeliveryAddresses/ProfileDeliveryAddresses";
import ProfilePaymentTypes from "../components/modules/ProfileModules/ProfilePaymentTypes/ProfilePaymentTypes";
import ProfileSettings from "../components/modules/ProfileModules/ProfileSettings/ProfileSettings";
import Admin from "../pages/Admin/Admin";
import AdminCategories from "../components/modules/AdminModules/AdminCategories/AdminCategories";
import AdminOrders from "../components/modules/AdminModules/AdminOrders/AdminOrders";
import AdminModeration from "../components/modules/AdminModules/AdminModeration/AdminModeration";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Area />}>
      <Route index element={<Main />} />
      <Route path="login" element={<Login />} />
      <Route path="registration" element={<Registration />} />
      <Route path="categories" element={""}></Route>
      <Route
        path="admin"
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
      >
        <Route path="orders" element={<AdminOrders />} />
        <Route path="categories" element={<AdminCategories />} />
        <Route path="moderation" element={<AdminModeration />}></Route>
      </Route>

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      >
        <Route path="info" element={<ProfileInfo />} />
        <Route path="delivery" element={<ProfileDeliveryAddresses />} />
        <Route path="payment" element={<ProfilePaymentTypes />} />
        <Route path="settings" element={<ProfileSettings />} />
      </Route>
    </Route>
  )
);
