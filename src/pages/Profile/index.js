import { useEffect, useState } from "react";
import { api } from "../../api/api";

export function Profile() {
  const [user, setUser] = useState({ name: "", email: "" });

  useEffect(() => {
    async function fetchUser() {
      const response = await api.get("/user/profile");
      setUser(response.data);
    }

    fetchUser();
  }, []);

  return (
    <>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </>
  );
}
