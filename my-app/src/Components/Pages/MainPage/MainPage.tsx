// import "./MainPage.css";
import React, { useState } from "react";
import SearchMusic from "../Search/Search.music";
import InterestSong from "../Interest/Interest.Song";
import PlayList from "../PlayList/PlayList.music";
import Sound from "../PlaySound/Sound.music";

// import img from "MainPage.css"
export default function MainPage() {
  const [searchResponse, setSearchResponse] = useState([]);

  // Get Method to receive the data from the parent
  const onGetSearchResponse = (response: []) => {
    setSearchResponse(response);
  };
  // Maintain the state here for the main page

  // Parent Page
  /*
    Children:1. Search
            2. Interest Song
            3. PlayList Session
            4. Sound
    */

  return (
    <div className="container card">
      <h4>MainPage Session</h4>
      <SearchMusic />
      <InterestSong />
      <PlayList />
      <Sound />
    </div>
  );
}
