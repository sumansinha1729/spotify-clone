import React, { useEffect, useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import DisplayHome from './DisplayHome';
import DisplayAlbum from './DisplayAlbum';
import { albumsData } from "../assets/assets";

const Display = () => {
  const displayRef = useRef();
  const location = useLocation();
  const isAlbum = location.pathname.includes("album");

  // Improved albumId extraction
  const albumId = isAlbum ? location.pathname.split("/").pop() : "";

  // Safely access the album data
  const album = albumsData[Number(albumId)];
  const bgColor = album?album.bgColor:"#121212";  // Default color

  useEffect(() => {
    if (displayRef.current) {
      if (isAlbum) {
        displayRef.current.style.background = `linear-gradient(${bgColor}, #121212)`;
      } else {
        displayRef.current.style.background = `#121212`;
      }
    }
  }, [isAlbum, bgColor]);

  return (
    <div ref={displayRef} className="w-[100%] m-2 px-6 pt-4 rounded text-white overflow-auto lg:ml-0">
      <Routes>
        <Route path="/" element={<DisplayHome />} />
        <Route path="/album/:id" element={<DisplayAlbum />} />
      </Routes>
    </div>
  );
}

export default Display;
