import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import NewQuestion from "./pages/NewQuestion";
import Question from "./pages/Question";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Menu from "./components/Menu";
import Profile from "./pages/Profile";
import {LoginContext} from "./helpers/LoginContext";
import { useState } from 'react';



function App() {

  const [user, setUser] = useState({});

  return (
    <div className="App">
      <LoginContext.Provider value={{user, setUser}}>
      <Router>
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/newquestion" element={<NewQuestion />} />
          <Route path="/question/:id" element={<Question />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
      </LoginContext.Provider>
    </div>
  );
}

export default App;
