import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import MainMenu from "./components/MainMenu";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import {LoginContext} from "./helpers/LoginContext";
import { useState } from 'react';



function App() {

  const [user, setUser] = useState({});

  return (
    <div className="">
      <LoginContext.Provider value={{user, setUser}}>
      <Router>
        <MainMenu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
      </LoginContext.Provider>
    </div>
  );
}

export default App;
