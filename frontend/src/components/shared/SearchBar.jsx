import React from "react";

import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ getSearchInput }) => {
  // const [input, setInput] = useState();
  const navigate = useNavigate();

  const handleFocus = () => {
    console.log("focused");
    navigate("/search");
  };
  const handleChange = (e) => {
    // setInput(e.target.value);
    getSearchInput(e.target.value);
  };

  return (
    <div onFocus={handleFocus} className="shadow px-2 py-1 rounded ">
      <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "gray" }} />
      <input
        type="text"
        placeholder="Search"
        className="h-[30px] md:w-[300px] p-2 outline-0"
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
