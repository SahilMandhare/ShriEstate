import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Header = () => {

  const [search, setSearch] = useState("")
  
  const currentUser = useSelector((state) => state.userSlice.currentUser);

  const router = useRouter()

  useEffect(() => {

    const urlParams = new URLSearchParams(location.search)
    setSearch(urlParams.get("search") || search)
    console.log(urlParams.get("search"))
  }, [location.search])
  

  const searchHandler = () => {

    router.push(`/search?search=${search}`)
  }
  
  return (
    <header className="bg-slate-400 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link href="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-600">Shri</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>
        <form className="flex gap-2 bg-slate-100 p-3 rounded-lg">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none text-slate-700 w-24 sm:w-64"
            onChange={(e) => setSearch(e.target.value)}
            defaultValue={search}
          />
          <p onClick={searchHandler} className="cursor-pointer">🔍</p>
        </form>
        <ul className="flex gap-4">
          <li className="hidden sm:inline text-slate-700 hover:underline">
            <Link href="/"> Home </Link>
          </li>
          <li className="hidden sm:inline text-slate-700 hover:underline">
            <Link href="/about"> About </Link>
          </li>
          {currentUser ? (
            <li className="sm:inline text-slate-700 hover:underline">
              <Link href="/profile"> <img className="rounded-full h-7 w-7 object-cover" src={currentUser.avatar} alt="Profile" /> </Link>
            </li>
          ) : (
            <li className="sm:inline text-slate-700 hover:underline">
              <Link href="/signin"> Sign In </Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
