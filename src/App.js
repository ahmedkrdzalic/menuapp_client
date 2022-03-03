import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import NewQuestion from "./pages/NewQuestion";
import Question from "./pages/Question";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Menu from "./components/Menu";


function App() {

  return (
    <div className="App">
      <Router>
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/newquestion" element={<NewQuestion />} />
          <Route path="/question/:id" element={<Question />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
