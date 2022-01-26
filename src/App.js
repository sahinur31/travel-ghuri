import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import AuthProvider from "./components/contexts/AuthProvider/AuthProvider";
import Home from "./components/Pages/Home/Home/Home";
import Login from "./components/Pages/Login/Login/Login";
import Register from "./components/Pages/Login/Register/Register";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
