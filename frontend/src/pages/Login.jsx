import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-md m-auto mt-14 gap-6 text-amber-900 bg-yellow-50 rounded-lg p-8 shadow-md border border-amber-300"
    >
      <div className="inline-flex items-center gap-2 mb-4 mt-10">
        <p className="prata-regular text-3xl font-semibold text-amber-700">
          {currentState}
        </p>
        <hr className="border-none h-[1.5px] w-12 bg-amber-500" />
      </div>
  
      {currentState === "Login" ? null : (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="w-full px-4 py-3 border border-amber-400 rounded-md text-amber-900 placeholder-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-300"
          placeholder="Name"
          required
        />
      )}
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        className="w-full px-4 py-3 border border-amber-400 rounded-md text-amber-900 placeholder-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-300"
        placeholder="Email"
        required
      />
  
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        className="w-full px-4 py-3 border border-amber-400 rounded-md text-amber-900 placeholder-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-300"
        placeholder="Password"
        required
      />
  
      <div className="w-full flex justify-between text-sm mt-[-6px] text-amber-700 font-medium">
        <p className="cursor-pointer hover:text-amber-900 transition">
          Forgot your password?
        </p>
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer hover:text-amber-900 transition"
          >
            Create account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer hover:text-amber-900 transition"
          >
            Login Here
          </p>
        )}
      </div>
  
      <button
        type="submit"
        className="bg-gradient-to-r from-yellow-400 to-amber-400 hover:from-yellow-500 hover:to-amber-500 text-white font-semibold px-8 py-3 rounded-md shadow-md transition"
      >
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
  
};

export default Login;
