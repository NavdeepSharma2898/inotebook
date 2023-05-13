import React from "react";
import Photo from '../assets/images/01.jpg';
import {BsPersonCircle , BsFillPersonVcardFill} from 'react-icons/bs';
import {AiOutlineMail} from 'react-icons/ai'
import {FaMobileAlt} from 'react-icons/fa'
import {MdOutlineComputer} from 'react-icons/md'
const About = (props) => {
 
  return (
    <div className={`container text-${props.mode === 'light'?'dark':'light'}`}>
      <div className="container">
        <h3 className="display-4">iNoteBook&copy;</h3>
        <p>
          Remember everything and tackle any project with your notes, tasks, and
          schedule all in one place. it gives you everything you need to keep
          life organized—great note taking, project planning, and easy ways to
          find what you need, when you need it. Create a personal space for all
          your most important ideas and information. Sync your notes to all your
          devices so they stay with you, even if you are offline.
        </p>
      </div>

      <div className="card mb-3 bg-dark" >
        <div className="row g-0">
          <div className="col-md-3 mx-4 my-4">
            <img src={Photo} className="img-fluid w-75 h-100 "  alt="..." />
          </div>
          <div className="col-md-8 my-5">
            <div className="card-body text-white">
              <h3 className="card-title text-info"> <BsFillPersonVcardFill className="mx-3"/>ABOUT THE DEVELOPER</h3>
              <p className="card-text my-3 h5">
                <BsPersonCircle className="text-info"/> Name : Navdeep sharma
              </p>
              <p className="card-text my-3 h5">
                <AiOutlineMail className="text-info"/> Email : navdeepsharma4072@gmail.com
              </p>
              <p className="card-text my-3 h5">
               <FaMobileAlt className="text-info"/> Contact : 8544881995
              </p>
              <p className="card-text my-3 h5">
               <MdOutlineComputer className="text-info"/> Technology : MERN
              </p>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
