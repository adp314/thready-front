import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";

export function Profile() {
  const [user, setUser] = useState({ name: "", email: "" });
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await api.get("/user/profile");
        // console.log(response);
        setUser(response.data);
        console.log(user);
      }
      catch (err) {
        console.log(err);
      }
    }
    fetchUser();
  }, []);
 
  function handleLogOut() {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  }

  return (
    <>
    <div>
      <h1>{user.userName}</h1>
      <p>{user.email}</p>
      <button onClick={handleLogOut}>Sair</button>
    </div>
    {/* Essa lista esta dando um erro de keyprop, q não consegui corrigir */}
    <ul>
      {user.threadsCreated ? 
        user.threadsCreated.map(element => {
          return <li key={element._id}> 
                   <div>
                      <h2>{element.title}</h2>
                      <p>{element.text}</p>
                      <p>{element.likes}</p>
                      <div>
                        {                       
                        element.tags.map(tag => {
                          return <>
                          <p>{tag}</p>
                          </>
                        })}
                      </div>
                    </div>
                    <button>Edit</button>
                 </li>})
                          : 'Loading...'}
    </ul>
    </>
  );
}
