import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";

export function Profile() {
  const [user, setUser] = useState({ name: "", email: "" });
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchUser() {
      const response = await api.get("/user/profile");
      setUser(response.data);
    }

    fetchUser();
  }, []);

  function handleLogOut() {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  }

  return (
    <>
<<<<<<< HEAD
      <h1>{user.name}</h1>
=======
      <h1>{user.userName}</h1>
>>>>>>> 8ee0e4f6c1eed317853590078bb6db04e81cc935
      <p>{user.email}</p>
      <button onClick={handleLogOut}>Sair</button>
    </>
  );
}
