import React from "react";
import SearchBar from "./shared/SearchBar";
import logo from "../assets/logo512.png";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";
import { useNavigate } from "react-router-dom";

const MainHeader = ({ getSearchInput }) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const logoutHandler = () => {
    auth.logout();
    navigate("/");
  };
  return (
    <div className="container mx-auto flex flex-wrap gap-1 justify-center md:justify-between items-center text-xs sm:text-base py-2 px-4 flex-col sm:flex-row">
      <div className="flex items-center mr-2">
        <img src={logo} alt="logo" className="h-[35px] bg-[#1560bd]" />
      </div>
      {auth.isLoggedIn ? <SearchBar getSearchInput={getSearchInput} /> : null}
      {auth.isLoggedIn ? (
        <p className="text-lg">Hello {auth.userName}</p>
      ) : null}
      {auth.isLoggedIn ? (
        <div className="flex space-x-2 justify-center 	">
          <button
            type="button"
            className="inline-block px-3 py-1.5 text-[9px] sm:text-xs md-text-base sm:px-6 sm:py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            onClick={logoutHandler}
          >
            LogOut
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default MainHeader;
