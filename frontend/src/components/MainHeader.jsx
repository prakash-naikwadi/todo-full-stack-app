import React from "react";
import SearchBar from "./shared/SearchBar";

const MainHeader = ({getSearchInput}) => {
  return (
    <div className="container mx-auto flex justify-center py-2">
      <SearchBar getSearchInput={getSearchInput} />
    </div>
  );
};

export default MainHeader;
