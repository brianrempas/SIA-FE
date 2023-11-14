import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../store";

export const PrivateRoute = () => {
  const isLogin = useSelector((state: RootState) =>
    Boolean(state.authReducer.token)
  );

  return isLogin ? <Outlet /> : <Navigate to="/login" />;
};
