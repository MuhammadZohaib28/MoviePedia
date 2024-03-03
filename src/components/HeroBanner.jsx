import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useSelector } from "react-redux";

const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);

  const { data, loading } = useFetch("/movie/upcoming");

  useEffect(() => {
    const bg =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;

    setBackground(bg);
  }, [data]);

  const handleSearch = (e) => {
    if (e.key === "Enter" && search.length > 0) {
      navigate(`/search/${search}`);
    }
  };
  return (
    <div className=" flex justify-center items-center flex-col h-screen ">
      <img
        src={background}
        alt=""
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className=" flex flex-col z-50 justify-center gap-5 items-center w-1/2">
        <h1 className="text-8xl text-white font-bold">Welcome.😉</h1>
        <h2 className="text-5xl text-center font-medium text-[#FDBF60]">
          Millions of Movies, TV shows and people to discover.{" "}
          <span className="hover:bg-[#FDBF60] bg-[#fdbe6085] p-3 rounded-lg font-semibold text-white text-3xl cursor-pointer">
            Explore Now
          </span>
        </h2>
      </div>
      <div className="w-full flex justify-center items-center py-10">
        <input
          type="text"
          placeholder="Search for a movie or TV show......"
          onKeyUp={handleSearch}
          onChange={(e) => setSearch(e.target.value)}
          className="p-3 w-1/2 rounded-l-sm placeholder:text-[#000000a4] placeholder:font-normal focus:outline-none text-[#000000] font-semibold text-lg"
        />
        <button className="bg-[#FAA300] p-[14px] rounded-r-sm font-medium">
          Search
        </button>
      </div>
    </div>
  );
};

export default HeroBanner;
