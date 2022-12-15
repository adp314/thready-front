import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../../api/api";
import { BasicFront } from "../../components/BasicFront";
import style from "./style.module.css";

export function Profile() {
  const [user, setUser] = useState({ name: "", email: "" });
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await api.get("/user/profile");
        setUser(response.data);
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

  async function deleteThread(id){
    try {
      await api.delete(`./thread/delete/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

    return (

      <BasicFront navContent={
      <nav className={style.containerStickyNav}>
      <Link className={style.stickyPictoNavHome} to="/home">Home</Link>
      </nav>} centralContent={
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
                        <button onClick={() => deleteThread(element._id)}>Delete</button> 
                     </li>})
                              : 'Loading...'}
        </ul>
        </>
    
      }/>
      );
  };