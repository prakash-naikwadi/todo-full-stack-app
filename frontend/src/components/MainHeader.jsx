import React from "react";
import SearchBar from "./shared/SearchBar";
import logo from "../assets/logo512.png";

const MainHeader = ({ getSearchInput }) => {
  return (
    <div className="container mx-auto flex justify-between items-center	 py-2 px-4">
      <div className="flex items-center mr-2">
        <img src={logo} alt="logo" className="h-[35px] bg-[#1560bd]" />
      </div>
      <SearchBar getSearchInput={getSearchInput} />
    </div>
  );
};

export default MainHeader;
