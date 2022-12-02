import React from "react";
import SearchBar from "./shared/SearchBar";
import logo from "../assets/logo512.png";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";

const MainHeader = ({ getSearchInput }) => {
  const auth = useContext(AuthContext);
  return (
    <div className="container mx-auto flex justify-between items-center	 py-2 px-4">
      <div className="flex items-center mr-2">
        <img src={logo} alt="logo" className="h-[35px] bg-[#1560bd]" />
      </div>
      {auth.isLoggedIn ? <SearchBar getSearchInput={getSearchInput} /> : null}
    </div>
  );
};

export default MainHeader;
