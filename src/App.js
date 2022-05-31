import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import MainMenu from "./components/MainMenu";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import {LoginContext} from "./helpers/LoginContext";
import { useEffect, useState } from 'react';
import axios from "axios";
import EditMenu from "./pages/EditMenu";
import DisplayMenuGuest from "./pages/DisplayMenuGuest";



function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/user/profile`, {
            headers: {
              "Content-Type": "application/json"
            },
            withCredentials: true
            })
            .then((response) => {
              if(response.data){
                setUser(response.data);
              }
            });
  }, []);

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
          <Route path="/editmenu/:id" element={<EditMenu />} />
          <Route path="/:menutitle" element={<DisplayMenuGuest />} />
        </Routes>
      </Router>
      </LoginContext.Provider>
    </div>
  );
}

export default App;
