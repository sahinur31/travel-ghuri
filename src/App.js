import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import AuthProvider from "./components/contexts/AuthProvider/AuthProvider";
import AddNewBlog from "./components/Pages/Dashboard/Dashboard/AddNewBlog";
import Dashboard from "./components/Pages/Dashboard/Dashboard/Dashboard";
import MakeAdmin from "./components/Pages/Dashboard/Dashboard/MakeAdmin";
import Home from "./components/Pages/Home/Home/Home";
import Login from "./components/Pages/Login/Login/Login";
import Register from "./components/Pages/Login/Register/Register";
import PrivateRoute from "./components/routes/PrivateRoute";

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
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /> </PrivateRoute>}>
            
            <Route
                path="/dashboard/addNewBlog"
                element={<AddNewBlog></AddNewBlog>}
              ></Route>
            <Route
                path="/dashboard/makeAdmin"
                element={<MakeAdmin></MakeAdmin>}
              ></Route>
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
