import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../store";
import { useSelector } from "react-redux";

export const PublicRoute = () => {
  const isLogin = useSelector((state: RootState) =>
    Boolean(state.authReducer.token)
  );

  return isLogin ? <Navigate to="/" /> : <Outlet />;
};
