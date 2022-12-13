export function ThreadCard(props){
    const thread = props.threadObj;

    return (
        <div>
            <div>
                <h1>{thread.title}</h1>
            </div>
            <div>
                <p>{thread.creator.userName}</p> 
                <p>Stars</p>
                <p>{thread.likes}</p>
            </div>
            <div>
            {thread.text}
            </div>
            <div>
                {thread.tags}
            </div>
        </div>  
    )
}