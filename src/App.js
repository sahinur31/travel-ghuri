import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import AuthProvider from "./components/contexts/AuthProvider/AuthProvider";
import AddNewBlog from "./components/Pages/Dashboard/Dashboard/AddNewBlog";
import AllBlogs from "./components/Pages/Dashboard/Dashboard/AllBlogs";
import Dashboard from "./components/Pages/Dashboard/Dashboard/Dashboard";
import MakeAdmin from "./components/Pages/Dashboard/Dashboard/MakeAdmin";
import UpdateBlog from "./components/Pages/Dashboard/Dashboard/UpdateBlog";
import BlogDetails from "./components/Pages/Home/BlogDetails/BlogDetails";
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
            <Route path="/blogs/:id" element={<PrivateRoute><BlogDetails /> </PrivateRoute>}></Route>
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /> </PrivateRoute>}>
            
            <Route
                path="/dashboard/addNewBlog"
                element={<AddNewBlog></AddNewBlog>}
              ></Route>
            <Route
                path="/dashboard/makeAdmin"
                element={<MakeAdmin></MakeAdmin>}
              ></Route>
            <Route
                path="/dashboard/allBlogs"
                element={<AllBlogs></AllBlogs>}
              ></Route>
            <Route
                path="/dashboard/update/:id"
                element={<UpdateBlog></UpdateBlog>}
              ></Route>
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
