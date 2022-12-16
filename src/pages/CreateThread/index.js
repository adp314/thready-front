import React, { useState, useEffect, useRef } from "react";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";
import JoditEditor from 'jodit-react';



export function CreateThread(){

    const arrTags = ["Sports", "Nature", "Tec", "Tv & Movies", "Music",
    "Food", "Business", "Health", "Travel"]; // pegar direto do BD??

    const navigate = useNavigate();


    const [form, setForm] = useState({
        title: "",
        text: "",
        tags: []
    });

    const [checkedState, setCheckedState] = useState(
        new Array(arrTags.length).fill(false)
    );

    

    function handleChange(event) {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    function handleCheckbox(position) {
        const updatedCheckedState = checkedState.map((element, i) =>
          i === position ? !element : element
        );
        setCheckedState(updatedCheckedState);
    };

    const editor = useRef(null);


	const config = {
		readonly: false,
        height: 500,
        theme: "dark",
         // all options from https://xdsoft.net/jodit/doc/,
	}

    useEffect(() => {
        const arrTagsSelected = [];

        for (let i = 0; i < checkedState.length; i++) {
            const element = checkedState[i];
            if(element === true){
                arrTagsSelected.push(arrTags[i])
            }
        }

        setForm({...form, tags: [...arrTagsSelected]});

    }, checkedState)

    async function handleSubmit(e){
        e.preventDefault();
        try{
            await api.post("thread/create", form)
            navigate("/");
        }
        catch (err){
            console.log(err);
        }
    }

    function handleSave() {
        localStorage.setItem("document", form.text);
    }

    function loadDoc(){
        setForm(localStorage.getItem("document"));
    }


    return (
        <form>
            <label htmlFor="inputTitle">Title: </label>
            <input
                id="inputTitle"
                type="text"
                name="title"
                onChange={handleChange}
                value={form.title}
                required
            />
        <div>
            <label htmlFor="inputText">Text: </label>
            <JoditEditor
			ref={editor}
			value={form.text}
			config={config}
			tabIndex={1} // tabIndex of textarea
			onBlur={newContent => setForm({text: newContent})} // preferred to use only this option to update the content for performance reasons
			onChange={newContent => {}}
		    />
            <div className="Btns">
                <button onClick={handleSave}>Gravar Documento</button>
                <button onClick={loadDoc}>Carregar Último</button>
                <button onClick={() => setForm({text: ""})}>Novo</button>
            </div>
        </div>
            

            <label htmlFor="inputTags">Tags: </label>
            <div>
                Select your tags:
            {arrTags.map(function(element, index){
                return (
                    <div>
                     <input type="checkbox" 
                           id={element} 
                           name={element}
                           value={element}
                           checked={checkedState[index]}
                           onChange={() => handleCheckbox(index)} 
                           />
                      <label htmlFor={element}>{element}</label>       
                    </div>
                )
            })}
            </div>
            <button onClick={handleSubmit}>Create</button>
        </form>
    )
};