import React from "react";
import { Routes, Route, RouteProps, Navigate, Outlet } from "react-router-dom";
import LoginForm from "../Forms/LoginForm";
import RegistrationForm from "../Forms/RegistrationForm";
import PrivateRoute from "./PrivateRoute";
import Wallet from "../Homepage/Wallet";
import AddItem from "../Homepage/AddItem";
import { routeEnum } from "../../utils/enum";
import ItemList from "../Items/ItemList";
import ItemDetails from "../Items/ItemDetails";

function AppRoutes(props) {
  return (
    <div style={{ margin: "0 40px" }}>
      <Routes>
        <Route path={routeEnum.login} element={<LoginForm />} />
        <Route path={routeEnum.signup} element={<RegistrationForm />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path={routeEnum.home} element={<ItemList />} />
          <Route path={routeEnum.item}>
            <Route path={routeEnum.itemDetails} element={<ItemDetails />} />
            <Route path={routeEnum.addItem} element={<AddItem />} />
          </Route>
          <Route path={routeEnum.wallet} element={<Wallet />} />
        </Route>
      </Routes>
    </div>
  );
}

export default AppRoutes;
