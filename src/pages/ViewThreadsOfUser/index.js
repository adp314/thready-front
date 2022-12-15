import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { useParams } from "react-router-dom";

export function ViewThreadsOfUser() {

    const params = useParams();

    const [threadsData, setData] = useState({});

    useEffect(() => {
        async function getUserThreads(){
            try {
                const threadsUser = await api.get(`thread/byuser/${params.id}`);
                setData(threadsUser.data);
            } catch (err) {
                console.log(err);
            }
        }
 
        getUserThreads();
        console.log(threadsData);
    }, []);



    return (
        <>
        <div>
          <h1>{threadsData.userName}</h1>
          <p>{threadsData.email}</p>
        </div>
        {/* Essa lista esta dando um erro de keyprop, q não consegui corrigir */}
        <ul>
          {threadsData.threadsCreated ? 
            threadsData.threadsCreated.map(element => {
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
