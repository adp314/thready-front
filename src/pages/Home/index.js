import { ThreadCard } from "../../components/ThreadCard/index.js";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../../api/api";
import { BasicFront } from "../../components/BasicFront";
import style from "./style.module.css"

export function Home() {

    const [threadsAll, setThreads] = useState([]);
    
    const navigate = useNavigate();

    useEffect(() => {
        async function getAllThreads(){
          try {
            const response = await api.get("/thread/all");
            setThreads(response.data);
          } catch (err) {
            console.log(err);
          }
        }
        getAllThreads();
        console.log(threadsAll);
      }, []);

    return (
      <>
          <BasicFront navContent={
          <nav className={style.containerStickyNav}>
          <Link className={style.stickyPictoNavHome} to="/home">Home</Link>
          </nav>
          } centralContent={
          threadsAll.map(element => {
          return <ThreadCard threadObj={element} key={element._id}/>
          })
          }/>
      </>
    );
}