import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleClick = (e) => {
    addNote(note.title, note.description, note.tag);
    e.preventDefault(); // function to prevent page reload
    setNote({ title: "", description: "", tag: "" });
    props.showAlert("NOTE CREATED SUCCESSFULLY","success");
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className={` text-${props.mode === 'light'?'dark':'light'}`}>
      <div className="container">
        <center>
          <h2>ADD A NOTE</h2>
        </center>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              TITLE
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              onChange={onChange}
              minLength={3}
              required
              placeholder="Please enter atleast 4 characters "
              value={note.title}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              TAG
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              onChange={onChange}
              minLength={3}
              placeholder="Please enter atleast 4 characters"
              required
              value={note.tag}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              DESCRIPTION
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={onChange}
              minLength={3}
              placeholder="Enter Note data here"
              required
              value={note.description}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={note.title.length<4 || note.description.length<4 || note.tag.length<4}
            onClick={handleClick}
          >
            Add note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
