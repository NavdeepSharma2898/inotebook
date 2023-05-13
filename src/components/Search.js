import React, { useEffect,useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
import { useNavigate } from "react-router-dom";
import {AiOutlineClose} from "react-icons/ai";

const Search = (props) => {
  const context = useContext(noteContext);
  const { searchTag ,getNote } = context;
  const [note, setNote] = useState({ tag: "" });
  const [toggle,setToggle] = useState(false);
  

  let navigate = useNavigate();
  useEffect(() => {

    if (localStorage.getItem("token") ) {
        searchTag(note.tag);
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const handleClick = (e) => {
    searchTag(note.tag);
    e.preventDefault(); // function to prevent page reload
    setNote({ tag: "" });
    setToggle(true);
    
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const handleToggle = () =>{
    getNote();
  } 
  return (
    <>
      <form>
        <div className="d-flex">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search Your Notes By Tags"
            aria-label="Search"
            id="tag"
            name="tag"
            value={note.tag}
            onChange={onChange}
          />
          <button className="btn btn-primary" type="submit" onClick={handleClick}>
            Search
          </button>
        </div>
      </form>
      {
        toggle?
        <div className={`d-flex justify-content-center text-${props.mode === 'light'?'primary':'light'} my-4` } onClick={() =>setToggle(!toggle)}><AiOutlineClose className="h4" onClick={handleToggle}/>Close</div>
        :
        <div className={`d-flex justify-content-center text-${props.mode === 'light'?'primary':'light'} my-4 visually-hidden my-4` } onClick={() =>setToggle(toggle)}><AiOutlineClose className="h4" onClick={handleToggle}/>Close</div>
      }
    </>
  );
};

export default Search;
