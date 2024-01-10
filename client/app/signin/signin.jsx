import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import userSlice, { successData, failureData, errorData } from "../redux/user/userSlice";

const signin = () => {
  const [formData, setFormData] = useState({});

  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.userSlice.currentUser);
  const error = useSelector((state) => state.userSlice.error);

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
      const response = await fetch("http://localhost:4000/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!data.statusCode) {
        dispatch(successData(data));
        router.push("/");
        return
      } else {
        dispatch(failureData(data.message));
      }
    } catch (error) {
      dispatch(errorData(error.message));
    }
  };
  
  return (
    <>
      <div className="my-5 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
        <form onSubmit={formSubmit} className="flex flex-col gap-4">
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
            Sign In
          </button>
        </form>
        <div className="flex mt-5 gap-2">
          <p>Don't You Have Account ?</p>
          <Link href="/signup">
            <span className="text-blue-700">Sign Up</span>
          </Link>
        </div>
        {error && <p className="text-red-700 my-5">{error}</p>}
      </div>
    </>
  );
};

export default signin;
