import { Routes, Route, RouteProps, Navigate, Outlet } from "react-router-dom";
import { useStore } from "../../store/useStore";

const PrivateRoute = (props: RouteProps): any => {
  const { state, dispatch } = useStore();

  if (state.isAuthenticated) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" replace={true} />;
  }
};
export default PrivateRoute;
