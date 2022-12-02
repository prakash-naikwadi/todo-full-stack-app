import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignupForm() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginFormChange = () => {
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (firstName.length <= 1 && lastName.length <= 1) {
      alert("All fields are required");
      return;
    }
    if (password.length <= 7) {
      alert("Password Should Be greater than 7");
      return;
    }
    const data = {
      name: firstName.trim() + " " + lastName.trim(),
      email: email.trim(),
      password: password,
    };
    console.log(data);
    axios
      .post("/user/signup", data)
      .then((res) => {
        alert("User Created Successfully");
        navigate("/");
      })
      .catch(() => {
        alert("User Already Exist");
        return;
      });
  };

  return (
    <div className="block mx-auto p-6 rounded-lg shadow-lg bg-white max-w-md">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div className="form-group mb-6">
            <input
              type="text"
              className="form-control
            block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleInput123"
              aria-describedby="emailHelp123"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="form-group mb-6">
            <input
              type="text"
              className="form-control
            block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleInput124"
              aria-describedby="emailHelp124"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group mb-6">
          <input
            type="email"
            className="form-control block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="exampleInput125"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group mb-6">
          <input
            type="password"
            className="form-control block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="exampleInput126"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="
        w-full
        px-6
        py-2.5
        bg-blue-600
        text-white
        font-medium
        text-xs
        leading-tight
        uppercase
        rounded
        shadow-md
        hover:bg-blue-700 hover:shadow-lg
        focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
        active:bg-blue-800 active:shadow-lg
        transition
        duration-150
        ease-in-out"
        >
          Sign up
        </button>
        <p className="text-sm font-semibold mt-2 pt-1 mb-0">
          Already have an account?
          <a
            href="#!"
            className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
            onClick={handleLoginFormChange}
          >
            &nbsp; Login
          </a>
        </p>
      </form>
    </div>
  );
}

export default SignupForm;
