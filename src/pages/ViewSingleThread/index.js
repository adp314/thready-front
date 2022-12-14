import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { useParams } from "react-router-dom";

export function ViewSingleThread() {

    const params = useParams();

    const [thread, setThread] = useState({
        title: '',
        text: '',
        likes: 0,
        banner: {},
        tags: [],
        createdAt: '',
        creator: {},
        creatorName: ''
    });

    useEffect(() => {
        async function getThread(){
            try {
                const threadData = await api.get(`thread/single/${params.id}`);
                setThread(threadData.data);
            } catch (err) {
                console.log(err);
            }
        }
 
        getThread();
        console.log(thread);
    }, []); 

    return (
        <>
        { thread.title === '' ?   'Loading...': 
            <div>
                <div>
                    <h1>{thread.creator.userName}</h1>
                    <p>{thread.creator.email}</p>
                </div>
                <div>
                    <h2>{thread.title}</h2>
                    <p>{thread.text}</p>
                    <p>{thread.likes}</p>
                    <div>
                        {                       
                        thread.tags.map(tag => {
                        return <>
                        <p>{tag}</p>
                        </>
                        })}
                    </div>
                </div>
            </div>
}
        </>
      );
     
}