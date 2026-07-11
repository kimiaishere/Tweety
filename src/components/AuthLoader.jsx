import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";

export default function AuthLoader({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      dispatch(login(JSON.parse(user)));
    }
  }, [dispatch]);

  return <div className="h-full">{children}</div>;
}