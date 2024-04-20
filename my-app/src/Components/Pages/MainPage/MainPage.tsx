import React, { useEffect, useState } from "react";
import SearchMusic from "../Search/Search.music";
import InterestSong from "../AddToPlayList/AddToPlayList.Song";
import PlayList from "../PlayList/PlayList.music";
import Sound from "../PlaySound/Sound.music";

import "./mainPage.css";
import musicServices from "../../../apis/services/music.services";
// import img from "MainPage.css"
export default function MainPage() {
  const [searchResponse, setSearchResponse] = useState([]);

  const token = sessionStorage.getItem("token") as string;
  useEffect(() => {
    async function getallSong() {
      const response = await musicServices.getAllSong(token);
      setSearchResponse(response.data);
    }
    getallSong();
  }, []);

  return (
    <div className="container card">
      <h4>MainPage Session</h4>
      <SearchMusic />
      <InterestSong songList={searchResponse} />
      <PlayList />
      <Sound />
    </div>
  );
}
