import React from "react";
import Notes from "./Notes";


const Home = (props) => {
 const {showAlert} = props;
 const {mode}=props;
 const {toggleMode} =props;
  
  return (
    <>
    
    <Notes showAlert={showAlert} mode={mode} toggleMode={toggleMode}/>
    </>
  );
};

export default Home;
