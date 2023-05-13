import React, { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import Search from "./Search";
import { useNavigate } from "react-router-dom";


const Notes = (props) => {

  const {showAlert} = props;
 const {mode}=props;
 const {toggleMode} =props;
 
  let navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNote, editNote } = context;
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  useEffect(() => {
    if (localStorage.getItem("token") ) {
      getNote();
    } else {
      navigate("/login");
    }

    if(notes.length === 0)
    {
      getNote();
    }
    // eslint-disable-next-line
  }, []);

  const updateNote = (currentnote) => {
    ref.current.click();
    setNote({
      id: currentnote._id,
      etitle: currentnote.title,
      etag: currentnote.tag,
      edescription: currentnote.description,
    });
  };
  
  const ref = useRef(null);
  const refclose = useRef();

  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.etag, note.edescription);
    refclose.current.click();
    props.showAlert("UPDATED SUCCESSFULLY", "info");
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  
  return (
    <>
    
    <div className={`container`}>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 classv="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    TITLE
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    value={note.etitle}
                    minLength={3}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    TAG
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    onChange={onChange}
                    value={note.etag}
                    minLength={3}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    DESCRIPTION
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    onChange={onChange}
                    value={note.edescription}
                    minLength={3}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refclose}
              >
                Cancel Edit
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
      <AddNote showAlert={showAlert} mode={mode} toggleMode={toggleMode} />
      <div className={`container row my-3 justify-content-center`}>
        <h2 className={` text-${props.mode === 'light'?'dark':'light'} `}>Your Notes</h2>

          <Search mode={mode} toggleMode={toggleMode}/>

        <div className={`container text-center my-4  h4 text-${props.mode === 'light'?'dark':'light'} `}>{notes.length === 0 && "No Notes"}</div>
        
        {notes.map((note) => {
          return (
            
            <Noteitem
              key={note._id}
              updateNote={updateNote}
              showAlert={props.showAlert}
              note={note}
            />
            
          );
        })}
      </div>
    </>
  );
};

export default Notes;
