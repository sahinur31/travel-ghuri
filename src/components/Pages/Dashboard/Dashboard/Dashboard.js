import React, { useState } from "react";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { Link, Outlet } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
// import AddNewBlog from "./AddNewBlog";
import SideMenu from "./SideMenu";

const Dashboard = () => {
    const { user } = useAuth();
  const [sidenav, setSidenav] = useState(true);

  //toggling the side nav
  const handlenav = () => {
    setSidenav(!sidenav);
  };

  // auto hide
  window.addEventListener("resize", () => {
    if (window.innerWidth < 1098) {
      setSidenav(false);
    } else {
      setSidenav(true);
    }
  });

  // const [control, setControl] = useState("addBlog");
  return (
    <main className="w-full h-screen grid grid-cols-1 lg:grid-cols-6 xl:grid-cols-6">
      <div className="col-span-1 bg-gray-300">
      <div>
      {sidenav && (
        <>
          <nav className="flex fixed flex-col items-center w-72 bg-white h-screen px-2">
            <div className="mt-24 flex flex-col items-center justify-center space-y-3">
              {/* image  */}
              <img
                src="../../assets/profile.png"
                className="w-28 h-28 rounded-full object-contain mx-auto"
                alt={user.displayName}
              />
              {/* user info  */}
              <div>
                <h5 className="text-center font-primary text-gray-700">
                  {user.displayName}
                </h5>
                <p className="text-center font-primary text-gray-500 text-sm">
                  {user.email}
                </p>
              </div>
            </div>
            <div className="mt-10 mb-4">
              <ul className="flex flex-col space-y-3">
                <li className="bg-red-500 text-white flex items-center mb-3 rounded-md py-3 cursor-pointer px-2">
                  <Link to={`/dashboard/addNewBlog`}>
                  <div className="flex items-center space-x-3">
                    <span className="ml-2 font-primary">Add New Blog</span>
                  </div>
                  </Link>
                </li>
              </ul>
              <ul className="flex flex-col space-y-3">
                <li className="bg-red-500 text-white flex items-center mb-3  rounded-md py-3 cursor-pointer px-2">
                  <Link to={`/dashboard/makeAdmin`}>
                    <div className="flex items-center space-x-3">
                      <span className="ml-2 font-primary">Make Admin</span>
                    </div>
                  </Link>
                </li>
                <li className="bg-red-500 text-white flex items-center mb-3  rounded-md py-3 cursor-pointer px-2">
                  <Link to={`/dashboard/allBlogs`}>
                    <div className="flex items-center space-x-3">
                      <span className="ml-2 font-primary">Manage Blogs</span>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </>
      )}

      {/* //menu icons  */}
      <div
        className=" block fixed bottom-10 left-10 bg-white p-2 rounded-full cursor-pointer shadow-xl border border-primary"
        onClick={handlenav}
      >
        <MdOutlineArrowForwardIos className="text-2xl text-primary" />
      </div>
    </div>
       
      </div>
      <div className="col-span-5 pt-24 bg-gray-300">
      <div className="">
              <Outlet></Outlet>
            </div>
      </div>
    </main>
  );
};

export default Dashboard;
