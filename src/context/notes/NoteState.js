import noteContext from "./noteContext";
import React from "react";
import { useState } from "react";
const host = "http://localhost:5000";
const NoteState = (props) => {
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);


  // search note by tag
  const searchTag = async (tag) =>{
    // API call
    const response = await fetch(`${host}/api/notes/searchtag`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'Accept':'application/json',
        "auth-token":
        localStorage.getItem('token'),
      },
      body: JSON.stringify( {tag}),
    }); 
    const note = await response.json()
    
    setNotes(note); // returns an array
    
  };


  // get all note
  const getNote = async () => {
    // API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem('token'),
      },
      
    });
    const json = await response.json()
   console.log(json);
   setNotes(json)
  };

  // add a note
  const addNote = async (title, description, tag) => {
    
    // API call
    const response = await fetch("http://localhost:5000/api/notes/addnote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Accept':'application/json',
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({title, description, tag}),
      
    });
    const note = await response.json()
    
    //logic to add note
    
    setNotes(notes.concat(note)); // returns an array
    
  };
  // delete a note

  const deleteNote = async(id) => {
    // API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem('token'),
      },
      
    });
    const json = await response.json()
     console.log(json);
    // logic for deleting note
    console.log("passed to deleting note function" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
    
  };

  //edit a note

  const editNote = async (id, title,tag, description) => {
    // API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem('token'),
      },
      body: JSON.stringify( {title,tag, description}),
    });
    const json = await response.json()
    console.log(json);

    let newnotes = JSON.parse(JSON.stringify(notes))
    
    
    // logic to edit note in client
    for (let index = 0; index < newnotes.length; index++) {
      const element = newnotes[index];
      if (element._id === id) {
        newnotes[index].title = title;
        newnotes[index].description = description;
        newnotes[index].tag = tag;
        break;
      }
      
    }
    setNotes(newnotes)
    
  };
  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote ,getNote ,searchTag}}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
