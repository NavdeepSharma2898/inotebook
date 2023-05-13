import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import {AiFillDelete} from 'react-icons/ai';
import {FiEdit3} from 'react-icons/fi';
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
  
  const { note, updateNote } = props;
  const context = useContext(noteContext);
  const { deleteNote } = context;
  

  return (
    <div className={`container col-md-3 mx-3 my-2 bg-primary`} >
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title"> {note.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">TAG : {note.tag}</h6>
          <p className="card-text">{note.description}</p>
          <center>
            <Link to="/">
            <AiFillDelete className="mx-2" onClick={() => {
                  deleteNote(note._id);
                  props.showAlert("NOTE DELETED", "info");
                }}/>
            </Link>
            <Link to="/">
            <FiEdit3 className="mx-2" onClick={() => {
                  updateNote(note);
                }}/>
            </Link>
          </center>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
