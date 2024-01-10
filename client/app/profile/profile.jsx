import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteData,
  errorData,
  failureData,
  successData,
} from "../redux/user/userSlice";

const profile = () => {
  const currentUser = useSelector((state) => state.userSlice.currentUser);
  const error = useSelector((state) => state.userSlice.error);

  const [file, setFile] = useState(null);

  const [updateData, setUpdateData] = useState(null);

  const [userList, setUserList] = useState([]);

  // const fileRef = useRef();

  const dispatch = useDispatch();

  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push("/signin");
      return;
    }

    setFile(currentUser.avatar);
  }, [currentUser]);

  useEffect(() => {
    const fetchUserLists = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/lists/userList/" + currentUser._id
        );

        const data = await response.json();

        setUserList(data);
        dispatch(errorData(null));
      } catch (error) {
        dispatch(errorData(error.message));
      }
    };

    fetchUserLists();
  }, [error]);

  const formHandler = (e) => {
    setUpdateData({
      ...updateData,
      [e.target.id]: e.target.value,
    });
  };

  // const imageHandle = (e) => {
  //   setFile(URL.createObjectURL(e.target.files[0]));
  //   setUpdateData({
  //     ...updateData,
  //     [e.target.id]: URL.createObjectURL(e.target.files[0]),
  //   });
  // };

  const formSubmit = async (e) => {
    // dispatch(successData(update))

    try {
      e.preventDefault();
      if (updateData) {
        const response = await fetch(
          "http://localhost:4000/api/user/update/" + currentUser._id,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updateData),
          }
        );

        const data = await response.json();

        dispatch(successData(data));
      }

      return;
    } catch (error) {
      dispatch(errorData(error.message));
    }
  };

  const deleteHandler = async (e) => {
    // dispatch(successData(update))

    try {
      e.preventDefault();
      const response = await fetch(
        "http://localhost:4000/api/user/delete/" + currentUser._id,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (data.statusCode) {
        dispatch(errorData(data.message));
      }

      dispatch(deleteData());
    } catch (error) {
      dispatch(errorData(error.message));
    }
  };

  const signOutHandler = async (e) => {
    // dispatch(successData(update))

    try {
      e.preventDefault();
      // const response = await fetch(
      //   "http://localhost:4000/api/user/update/" + currentUser._id,
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(updateData),
      //   }
      // );

      // const data = await response.json()

      dispatch(successData(null));
      // dispatch(failureData(null))
    } catch (error) {
      dispatch(errorData(error.message));
    }
  };

  const deleteList = async (props) => {
    // dispatch(successData(update))

    try {
      const response = await fetch(
        "http://localhost:4000/api/lists/delete/" + props,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (data.statusCode) {
        dispatch(errorData(data.message));
      }

      dispatch(errorData(data.message));
    } catch (error) {
      dispatch(errorData(error.message));
    }
  };

  return (
    currentUser && (
      <>
        <div className="my-5 max-w-lg mx-auto">
          <h1 className="text-3xl text-center font-semibold my-7">Profile</h1>
          <form onSubmit={formSubmit} className="flex flex-col gap-4">
            {/* <input
              type="file"
              name="User Image"
              id="avatar"
              onChange={imageHandle}
              ref={fileRef}
              hidden
              accept="image/*"
            />
            <img
              className="rounded-full h-40 w-40 self-center"
              id="avatar"
              onClick={() => fileRef.current.click()}
              src={file}
              alt="Profile"
            /> */}

            <img
              className="rounded-full h-40 w-40 self-center object-cover"
              id="image"
              src={file}
              alt="Profile"
            />

            <input
              type="text"
              id="avatar"
              placeholder="Avatar"
              defaultValue={currentUser.avatar}
              onChange={formHandler}
              className="border p-3 rounded-lg text-black"
            />
            <input
              type="text"
              id="username"
              placeholder="Username"
              defaultValue={currentUser.username}
              onChange={formHandler}
              className="border p-3 rounded-lg text-black"
            />
            <input
              type="email"
              id="email"
              placeholder="Email"
              defaultValue={currentUser.email}
              onChange={formHandler}
              className="border p-3 rounded-lg text-black"
            />
            <input
              type="password"
              id="password"
              placeholder="Password"
              defaultValue={currentUser.password}
              onChange={formHandler}
              className="border p-3 rounded-lg text-black"
            />
            <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
              Update
            </button>
            <Link href="/create-listing">
              <div className="bg-green-800 text-white p-3 rounded-lg text-center cursor-pointer hover:bg-green-900 uppercase">
                Create Listing
              </div>
            </Link>
          </form>
          {error && <p className="text-red-700 my-5">{error}</p>}
          <div className="my-5 flex justify-between">
            <p className="cursor-pointer text-red-900" onClick={deleteHandler}>
              Delete Account
            </p>
            <p className="cursor-pointer text-red-900" onClick={signOutHandler}>
              Sign Out
            </p>
          </div>
          <h1 className="my-4 text-2xl text-center uppercase">My Listings</h1>
          <div className="flex flex-col gap-2">
            {userList.length ? (
              userList.map((list, i) => (
                <div
                  key={i}
                  className="p-4 flex justify-between items-center bg-slate-900 shadow-lg rounded-lg"
                >
                  <Link href={"list/" + list._id}>
                    <img
                      className="h-10 w-12 object-cover"
                      src={list.imageUrls[0].image}
                      alt=""
                    />
                  </Link>
                  <Link href={"list/" + list._id}>
                    <p className="hover:underline">{list.name}</p>
                  </Link>
                  <div className="flex flex-col gap-2 items-center justify-center">
                    <Link
                      href="/update-listing/[id]"
                      as={`/update-listing/${list._id}`}
                    >
                      <div className="uppercase text-green-700 cursor-pointer">
                        Update
                      </div>
                    </Link>
                    <div
                      onClick={() => deleteList(list._id)}
                      className="uppercase text-red-700 cursor-pointer"
                    >
                      Delete
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-lg">Not Found</div>
            )}
          </div>
        </div>
      </>
    )
  );
};

export default profile;
