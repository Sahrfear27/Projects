import React, { MouseEvent, useEffect, useState } from "react";
import SearchMusic from "../Search/Search.music";
import InterestSong from "../AddToPlayList/AddToPlayList.Song";
import PlayList from "../PlayList/PlayList.music";
import Sound from "../PlaySound/Sound.music";
import { IoIosAddCircle } from "react-icons/io";

import "./mainPage.css";
import musicServices from "../../../apis/services/music.services";
import { musicDataBase } from "../../../types/types";
import { PlayListDataBase } from "../../../types/types";

export default function MainPage() {
  const [songs, setSearchResponse] = useState<musicDataBase[]>([]);
  const [searched, setSearched] = useState(false);

  // State for player list
  const [newPlayList, setNewPlayList] = useState<musicDataBase[]>([]);

  // Get all music
  const token = sessionStorage.getItem("token") as string;
  useEffect(() => {
    async function getallSong() {
      const response = await musicServices.getAllSong(token);
      setSearchResponse(response.data);
    }
    getallSong();
  }, []);

  const handleSearch = () => {
    setSearched(true);
  };

  // Add the music: Not working for searched music
  const handleAdd = (music: musicDataBase) => {
    const exist = newPlayList.some((item) => item.id === music.id);

    if (!exist) {
      setNewPlayList([...newPlayList, music]);

      const updatedPlaylist = JSON.stringify([...newPlayList, music]);
      sessionStorage.setItem("playlist", updatedPlaylist);
    }
  };

  // Delete from playList
  const deleteSongFromList = (id: string) => {
    const removeItem = newPlayList.filter((musics) => musics.id !== id);
    setNewPlayList(removeItem);
  };

  // GetUserPlayList: HTTP request for playList and should be shown when the page load
  useEffect(() => {
    async function fetchUserPlayList() {
      try {
        const response = await musicServices.getPlaylist(token);
        setNewPlayList(response.data);
      } catch (error) {
        throw Error("Error fetching user playlist:");
      }
    }

    fetchUserPlayList();
  }, [token]);

  // Add playList to Sesson storage
  useEffect(() => {
    async function addPlayListToSessionStorage() {
      try {
        const songId = newPlayList.map((songs) => songs.id);
        for (let ids of songId) {
          await musicServices.addToStorage(token, ids);
        }

        const updatedPlayList = await musicServices.getPlaylist(token);
        setNewPlayList(updatedPlayList.data);

        const updatedList = JSON.stringify(updatedPlayList.data);
        sessionStorage.setItem("playlist", updatedList);
      } catch (error) {
        console.log("Error Occurs while adding playlist");
      }
    }
    addPlayListToSessionStorage();
  }, [newPlayList, token]);

  // Remove from client and server
  useEffect(() => {
    async function removePlayList() {
      try {
        const songId = newPlayList.map((song) => song.id);
        for (let id of songId) {
          await musicServices.removeFromServers(token, id);
        }

        const updatePlayList = await musicServices.getPlaylist(token);
        setNewPlayList(updatePlayList.data);
        const updateList = JSON.stringify(updatePlayList.data);
        sessionStorage.setItem("playlist", updateList);
      } catch (error) {
        console.log(error);
      }
    }
    removePlayList();
  }, []);
  return (
    <div className="container card">
      <h4>MainPage Session</h4>
      <SearchMusic onSearch={handleSearch} />
      {!searched && (
        <>
          <br />
          <h4>Music List</h4>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Index</th>
                <th>Release Date</th>
                <th>Title</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {songs.map((music, index) => (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{music.releaseDate}</td>
                  <td>{music.title}</td>
                  <td>
                    <a
                      href="#"
                      className="pe-auto text-secondary"
                      onClick={(e) => {
                        handleAdd(music);
                      }}
                    >
                      {" "}
                      <IoIosAddCircle />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <br />
        </>
      )}
      {searched && <InterestSong />}
      <br />
      <PlayList
        addMusic={newPlayList}
        onAddMusicToPlayList={handleAdd}
        deleteMusic={deleteSongFromList}
      />
      <br />
      <Sound />
    </div>
  );
}
