
import './App.css';
import React,{useState} from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Alert from './components/Alert';
// eslint-disable-next-lin
import { BrowserRouter , Routes, Route } from "react-router-dom";// eslint-disable-next-lin
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
function App(props) {
  const [mode, setMode] = useState("light");
  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "#0e1c4a";
      showAlert("Dark mode has been Enabled", "primary");
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
      showAlert("Light mode has been Enabled", "primary");
    }
  };
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  return (
    <>
    <NoteState>
    <BrowserRouter>
    <Navbar mode={mode} toggleMode={toggleMode}/>
    <Alert alert={alert} />
    <div className={`container`}>
        
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert}  mode={mode} toggleMode={toggleMode}/>} />
            <Route exact path="/about" element={<About showAlert={showAlert}  mode={mode} toggleMode={toggleMode}  />}  />
            <Route exact path="/login" element={<Login showAlert={showAlert}  mode={mode} toggleMode={toggleMode}/>}  />
            <Route exact path="/signup" element={<Signup showAlert={showAlert}  mode={mode} toggleMode={toggleMode}/>}  />
          </Routes>
          
      </div>
    </BrowserRouter>
    </NoteState>  
    </>  
  );
}

export default App;
