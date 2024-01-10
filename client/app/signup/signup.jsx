"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { errorData, failureData } from "../redux/user/userSlice";

const signup = () => {
  const [formData, setFormData] = useState({});

  const currentUser = useSelector((state) => state.userSlice.currentUser);
  const error = useSelector((state) => state.userSlice.error);

  const dispatch = useDispatch();

  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      router.push("/");
    }
  }, [currentUser]);

  const formHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const formSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch("http://localhost:4000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.statusCode === 200) {
        router.push("/signin");
        return
      }
      dispatch(failureData(data.message));
    } catch (error) {
      dispatch(errorData(error.message));
    }
  };
  
  return (
    <>
      <div className="my-5 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
        <form onSubmit={formSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            id="username"
            placeholder="Username"
            onChange={formHandler}
            className="border p-3 rounded-lg text-black"
          />
          <input
            type="email"
            id="email"
            placeholder="Email"
            onChange={formHandler}
            className="border p-3 rounded-lg text-black"
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={formHandler}
            className="border p-3 rounded-lg text-black"
          />
          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            Sign Up
          </button>
        </form>
        <div className="flex mt-5 gap-2">
          <p>You Have Account ?</p>
          <Link href="/signin">
            <span className="text-blue-700">Sign In</span>
          </Link>
        </div>
        {error && <p className="text-red-700 my-5">{error}</p>}
      </div>
    </>
  );
};

export default signup;
