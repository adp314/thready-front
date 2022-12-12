import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function ProtectedRoute(props) {
  const { component: Component } = props;
  const navigate = useNavigate();

  const loggedInUser = localStorage.getItem("loggedInUser");

  const parsedUser = JSON.parse(loggedInUser || '""');

  useEffect(() => {
    console.log(parsedUser);
<<<<<<< HEAD
    if (parsedUser) {
=======
    if (!parsedUser) {
>>>>>>> 8ee0e4f6c1eed317853590078bb6db04e81cc935
      navigate("/login");
    }
  }, []);

  return <Component />;
}
