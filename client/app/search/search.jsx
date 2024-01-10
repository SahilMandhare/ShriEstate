import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ListingItem from "../component/ListingItem";

const search = () => {
  const [listSearch, setListSearch] = useState({
    search: "",
    type: "",
    furnished: false,
    offer: false,
    parking: false,
  });

  const [lists, setLists] = useState([]);

  const router = useRouter();

  useEffect(() => {
    
    const urlParams = new URLSearchParams(location.search);

    console.log(urlParams.get("type"));
    setListSearch({
      ...listSearch,
      search: urlParams.get("search") || "",
      type: urlParams.get("type") || "",
      furnished: Boolean(urlParams.get("furnished")) || false,
      offer: Boolean(urlParams.get("offer")) || false,
      parking: Boolean(urlParams.get("parking")) || false,
    });

    const searchQuery = urlParams.toString()

    const listFind = async () => {
      try {

        const response = await fetch(
          `http://localhost:4000/api/lists/getList?${searchQuery}`
        );

        const data = await response.json();

        console.log(data);

        setLists(data);
      } catch (error) {
        console.log(error);
      }
    };

    listFind();
  }, [location.search])

  const listHandler = (e) => {
    e.target.id === "search"
      ? setListSearch({ ...listSearch, [e.target.id]: e.target.value })
      : e.target.id === "Sell" || e.target.id === "Rent"
      ? setListSearch({
          ...listSearch,
          type: e.target.checked ? e.target.id : "",
        })
      : setListSearch({ ...listSearch, [e.target.id]: e.target.checked });
  };

  const submitHandler = async (e) => {
    try {
      e.preventDefault();

      const urlParams = new URLSearchParams();
      urlParams.set("search", listSearch.search);
      urlParams.set("type", listSearch.type);
      urlParams.set("offer", listSearch.offer);
      urlParams.set("furnished", listSearch.furnished);
      urlParams.set("parking", listSearch.parking);
      const searchQuery = urlParams.toString();

      router.push(`/search?${searchQuery}`);

      const response = await fetch(
        `http://localhost:4000/api/lists/getList?${searchQuery}`
      );

      const data = await response.json();

      setLists(data);

      console.log(data[0].description.length);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(lists);

  return (
    <>
      <div className="sm:flex">
        <div className="m-8">
          <form onSubmit={submitHandler}>
            <div className="flex flex-wrap items-center gap-3">
              <h1>Search : </h1>
              <input
                className="p-3 text-black rounded-lg"
                id="search"
                placeholder="search"
                type="text"
                onChange={listHandler}
                value={listSearch.search}
              />
            </div>
            <div className="flex flex-wrap items-center">
              <h1>Type : </h1>
              <div className="p-4 flex gap-3 items-center">
                <input
                  id="Sell"
                  className="h-6 w-6 border-2 border-gray-500 rounded-md"
                  type="checkbox"
                  onChange={listHandler}
                  checked={listSearch.type === "Sell"}
                />
                <p>Sell</p>
              </div>
              <div className="p-4 flex gap-3 items-center">
                <input
                  id="Rent"
                  className="h-6 w-6 border-2 border-gray-500 rounded-md"
                  type="checkbox"
                  onChange={listHandler}
                  checked={listSearch.type === "Rent"}
                />
                <p>Rent</p>
              </div>
              <div className="p-4 flex gap-3 items-center">
                <input
                  id="offer"
                  className="h-6 w-6 border-2 border-gray-500 rounded-md"
                  type="checkbox"
                  onChange={listHandler}
                  checked={listSearch.offer}
                />
                <p>Offer</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center">
              <h1>Type : </h1>
              <div className="p-4 flex gap-3 items-center">
                <input
                  id="parking"
                  className="h-6 w-6 border-2 border-gray-500 rounded-md"
                  type="checkbox"
                  onChange={listHandler}
                  checked={listSearch.parking}
                />
                <p>Parking Spot</p>
              </div>
              <div className="p-4 flex gap-3 items-center">
                <input
                  id="furnished"
                  className="h-6 w-6 border-2 border-gray-500 rounded-md"
                  type="checkbox"
                  onChange={listHandler}
                  checked={listSearch.furnished}
                />
                <p>Furnished</p>
              </div>
            </div>
            <button className="p-3 w-full bg-slate-700 hover:bg-slate-800 rounded-lg text-center">
              Search
            </button>
          </form>
        </div>
        <div className="m-4">
          <h1 className="text-3xl text-center">Listing</h1>
          <div className="p-4 flex flex-wrap gap-4 items-center">
            {lists.length > 0 &&
              lists.map((list, i) => (
                // <Link href={"/list/" + list._id}>
                //   <div className="w-[415px] sm:w-[333px] bg-slate-800 h-[450px] rounded-lg shadow-lg hover:scale-105 transition-all">
                //     <img
                //       className="h-[250px] rounded-lg object-cover w-full"
                //       src={list.imageUrls[0].image}
                //       alt=""
                //     />
                //     <div className="p-4 flex flex-col gap-2">
                //       <h1 className="text-lg font-semibold truncate">
                //         {list.name}
                //       </h1>
                //       <p>📌 {list.address}</p>
                //       <p>
                //         {list.description.length > 100
                //           ? list.description.slice(0, 100) + "..."
                //           : list.description}
                //       </p>
                //       <div className="flex gap-2">
                //         <p>{list.bedrooms} Beds</p>
                //         <p>{!list.furnished && "Not"} Furnished</p>
                //       </div>
                //     </div>
                //   </div>
                // </Link>

                <ListingItem listing={list} />
              ))}
            {!lists.length && (
              <h1 className="text-3xl text-center">Not Found</h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default search;
