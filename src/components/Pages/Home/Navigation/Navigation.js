import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { HiMenuAlt3 } from "react-icons/hi";
import useAuth from "../../../hooks/useAuth";

const Navigation = ({ bg, textColor, width }) => {
  const [changeHeader, setChangeHeader] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const menu = [
    
    { id: 2, text: "Dashboard", to: "/dashboard" },
  ];

  //handle click
  const handleClick = () => {
    setMobileNav(!mobileNav);
  };

  //route change
  const handleChangeRoute = () => {
    navigate("/register");
  };

  //header scroll effect
  const handleChangeHeader = () => {
    if (window.scrollY >= 50) {
      setChangeHeader(true);
    } else {
      setChangeHeader(false);
    }
  };

  window.addEventListener("scroll", handleChangeHeader);
  return (
    <div>
      <header
        className={`${
          changeHeader ? "bg-white" : `${bg}`
        } w-full  fixed top-0 left-0  z-50 transition duration-200`}
      >
          <div className="container">
              {/* desktop nav  */}
            <nav className={`flex items-center py-3 font-primary ${width} mx-auto`}>
                {/* brand  */}
                <div className="flex items-center flex-grow">
                    <Link to="/" className="flex items-center space-x-2">
                        <img src="../../../assets/logo.png" alt="logo" className="w-12 h-12" />
                        <h2 className={`${changeHeader ? "text-gray-800" : `${textColor}`} text-2xl font-semibold select-none font-logo`}>Cholo Ghuri</h2>
                    </Link>
                </div>

                {/* menu s */}
                <div className="hidden md:flex lg:flex space-x-3">
                    {user.email && (
                        <>
                            <ul className="flex items-center space-x-4">
                                {menu.map(item => (
                                    <li key={item.id}>
                                        <NavLink to={item.to} className={`${changeHeader ? "text-gray-700" : `${textColor} `} text-base`}>{item.text}</NavLink>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}

                    {/* user authentication  */}
                    {
                        user.email ? (
                            <div className="flex items-center space-x-3">
                                <img src="../../../assets/profile.png" alt={user.displayName} className="w-10 h-10 rounded-full" />
                                <span className={`${changeHeader ? "text-gray-700" : `${textColor}`}`}>{user.displayName}</span>
                                <button className="btn-1 px-3" onClick={logout}>Logout</button>
                            </div>

                        ) : (
                            <>
                                <button className="btn-1 px-3" onClick={handleChangeRoute}>Register</button>
                            </>
                        )
                    }

                </div>

                {/* menu icon  */}
                <div className="block md:hidden lg:hidden">
                    <HiMenuAlt3 className="w-10 h-10 ring-red-300 bg-red-500 text-white focus:ring-4 cursor-pointer rounded-lg p-2 transform transition duration-200 hover:scale-110" onClick={handleClick} />
                </div>
            </nav>

            {/* mobile nav  */}
            {mobileNav && (
                    <nav className="bg-white shadow-lg mx-6 mt-2 rounded-lg border border-gray-300 py-6 block md:hidden lg:hidden">
                        <ul>
                            {menu.map(item => (
                                <NavLink key={item.id} to={item.to} className="text-gray-600 text-lg">
                                    <li className="py-2 px-3 w-full hover:bg-gray-200 transition duration-300 cursor-default">
                                        {item.text}
                                    </li>
                                </NavLink>
                            ))}
                        </ul>

                        {/* user authentication  */}
                        {
                            user.email ? (
                                <div className="flex flex-col items-center space-y-3">
                                    <img src="../../../assets/profile.png" alt={user.displayName} className="w-10 h-10 rounded-full" />
                                    <span className="text-gray-700">{user.displayName}</span>
                                    <button className="btn-1 px-3" onClick={logout}>Logout</button>
                                </div>

                            ) : (
                                <>
                                    <div className="px-3 py-2">
                                        <button className="btn-1 w-full" onClick={handleChangeRoute}>Register</button>
                                    </div>
                                </>
                            )
                        }
                        {/* button  */}

                    </nav>
            )}
          </div>
      </header>
    </div>
  );
};

export default Navigation;
