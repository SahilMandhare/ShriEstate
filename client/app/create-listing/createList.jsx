import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { errorData } from "../redux/user/userSlice";

const createList = () => {
  const currentUser = useSelector((state) => state.userSlice.currentUser);
  const error = useSelector((state) => state.userSlice.error);

  const dispatch = useDispatch();

  const router = useRouter();

  const [list, setList] = useState({
    name: "",
    address: "",
    description: "",
    regularPrice: 0,
    discountPrice: 0,
    bedrooms:0,
    bathrooms: 0,
    furnished: false,
    parking: false,
    type: "",
    offer: false,
    imageUrls: [],
    useRef: currentUser._id,
  });

  const [image, setImage] = useState([{ id: 0, image: "" }]);
  const [count, setCount] = useState(1);

  const listHandler = (e) => {
    e.preventDefault();
    if (e.target.type === "checkbox") {
      if (e.target.id === "Sell" || e.target.id === "Rent") {
        if (e.target.checked) setList({ ...list, type: e.target.id });
        else setList({ ...list, type: "" });
      } else {
        setList({ ...list, [e.target.id]: e.target.checked });
      }
    } else {
      setList({ ...list, [e.target.id]: e.target.value });
    }
  };

  const imgHandler = async (e, id) => {
    e.preventDefault();
    const updatedImages = image.map((img) =>
      img.id === id ? { ...img, image: e.target.value } : img
    );
    setImage(updatedImages);
  };
  
  useEffect(() => {

    setList({ ...list, imageUrls: [...image] });
  }, [image])
  

  const submitHandler = async (e) => {
    try {
      e.preventDefault();

      const response = await fetch("http://localhost:4000/api/lists/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(list),
      });

      const data = await response.json();

      if (data.statusCode === 200) {
        router.push("/profile");
        dispatch(errorData(null));
        return;
      }

      dispatch(errorData(data.message));
    } catch (error) {
      dispatch(errorData(error.message));
    }
  };

  return (
    <>
      <div className="m-5">
        <h1 className="text-2xl text-center font-semibold">Create Listing</h1>
        <form onSubmit={submitHandler} className="min-[640px]:flex flex-1">
          <div className="my-6 flex flex-col flex-1 gap-5 max-w-md mx-auto">
            <input
              className="p-3 text-black rounded-lg"
              id="name"
              placeholder="name"
              type="text"
              onChange={listHandler}
              required
            />
            <textarea
              className="p-3 text-black rounded-lg"
              id="description"
              placeholder="description"
              type="text"
              onChange={listHandler}
              required
            />
            <input
              className="p-3 text-black rounded-lg"
              id="address"
              placeholder="address"
              type="text"
              onChange={listHandler}
              required
            />
            <div className="flex flex-wrap">
              <div className="p-4 flex gap-3 items-center">
                <input
                  id="Sell"
                  className="h-6 w-6 border-2 border-gray-500 rounded-md"
                  type="checkbox"
                  onChange={listHandler}
                  checked={list.type === "Sell"}
                />
                <p>Sell</p>
              </div>
              <div className="p-4 flex gap-3 items-center">
                <input
                  id="Rent"
                  className="h-6 w-6 border-2 border-gray-500 rounded-md"
                  type="checkbox"
                  onChange={listHandler}
                  checked={list.type === "Rent"}
                />
                <p>Rent</p>
              </div>
              <div className="p-4 flex gap-3 items-center">
                <input
                  id="parking"
                  className="h-6 w-6 border-2 border-gray-500 rounded-md"
                  type="checkbox"
                  onChange={listHandler}
                />
                <p>Parking Spot</p>
              </div>
              <div className="p-4 flex gap-3 items-center">
                <input
                  id="furnished"
                  className="h-6 w-6 border-2 border-gray-500 rounded-md"
                  type="checkbox"
                  onChange={listHandler}
                />
                <p>Furnished</p>
              </div>
              <div className="p-4 flex gap-3 items-center">
                <input
                  id="offer"
                  className="h-6 w-6 border-2 border-gray-500 rounded-md"
                  type="checkbox"
                  onChange={listHandler}
                />
                <p>Offer</p>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="p-4 flex gap-3 items-center">
                <input
                  id="bedrooms"
                  className="p-4 border-2 h-12 w-20 text-black border-gray-500 rounded-md"
                  min="0"
                  max="10"
                  type="number"
                  onChange={listHandler}
                />
                <p>Beds</p>
              </div>
              <div className="p-4 flex gap-3 items-center">
                <input
                  id="bathrooms"
                  className="p-4 border-2 h-12 w-20 text-black border-gray-500 rounded-md"
                  min="0"
                  max="10"
                  type="number"
                  onChange={listHandler}
                />
                <p>Bath</p>
              </div>
              <div className="p-4 flex gap-3 items-center">
                <input
                  id="regularPrice"
                  className="p-4 border-2 h-12 w-20 text-black border-gray-500 rounded-md"
                  min="0"
                  max="1000000"
                  type="number"
                  onChange={listHandler}
                />
                <p>Regular Pice</p>
              </div>
              {list.offer && <div className="p-4 flex gap-3 items-center">
                <input
                  id="discountPrice"
                  className="p-4 border-2 h-12 w-20 text-black border-gray-500 rounded-md"
                  min="0"
                  max="1000000"
                  type="number"
                  onChange={listHandler}
                />
                <p>Discount Price</p>
              </div>}
            </div>
          </div>
          <div className="my-6 flex flex-col flex-1 gap-5 max-w-md mx-auto">
            {/* <input
              key={0}
              className="p-3 text-black rounded-lg"
              id={0}
              placeholder="image"
              type="text"
              onChange={imgHandler}
            /> */}
            {image.map((img) => (
              <input
                key={img.id}
                className="p-3 text-black rounded-lg"
                id={img.id}
                placeholder="image"
                type="text"
                value={img.image}
                onChange={(e) => imgHandler(e, img.id)}
                required
              />
            ))}
            {image.length < 5 && (
              <div
                onClick={() => {
                  setCount(count + 1);
                  setImage([...image, { id: count, image: "" }]);
                }}
                className="px-4 py-2 w-fit cursor-pointer border-2 border-green-700 hover:bg-green-700"
              >
                +
              </div>
            )}
            <button className="p-3 bg-slate-700 hover:bg-slate-800 rounded-lg">
              Create List
            </button>
            {error && <p className="text-red-700">{error}</p>}
          </div>
        </form>
      </div>
    </>
  );
};

export default createList;
