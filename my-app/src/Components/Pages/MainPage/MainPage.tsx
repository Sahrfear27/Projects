import { useEffect, useState } from "react";

import musicServices from "../../../apis/services/music.services";
import SearchMusic from "../Search/Search.music";
import PlayList from "../PlayList/PlayList.music";
import Sound from "../PlaySound/Sound.music";
import { IoIosAddCircle } from "react-icons/io";
import { musicDataBase } from "../../../types/types";
import "./mainPage.css";

export default function MainPage() {
  const [totalMusic, setTotalMusic] = useState<musicDataBase[]>([]);
  // Get name
  // const [userName, setUserName] = useState("");

  const [searchText, setSearchText] = useState("");
  const [newPlayList, setNewPlayList] = useState<musicDataBase[]>([]);

  const token = sessionStorage.getItem("token") as string;
  useEffect(() => {
    // const token = PubSub.subscribe("userName", (msg, data) => {
    //   console.log(data);
    //   setUserName(data);
    // });
    getSearchData(searchText);
    return () => {
      PubSub.unsubscribe(token);
    };
  }, []);

  async function getSearchData(search: string) {
    try {
      if (search.trim()) {
        const response = await musicServices.getSong(search);

        setTotalMusic(response.data);
      } else {
        const response = await musicServices.getTotalSong(token);
        setTotalMusic(response.data);
      }
    } catch (error) {
      console.log("Error Occur getting the data", error);
    }
  }
  // Set the search to the search variable and send a get request with the search value
  const handleSearch = (data: string) => {
    setSearchText(data);
    getSearchData(data);
  };

  // GetUserPlayList
  // const newtoken = sessionStorage.getItem("token") as string;
  useEffect(() => {
    async function fetchUserPlayList() {
      try {
        // const response = await musicServices.getPlaylist(newtoken);
        const response = await musicServices.getPlaylist(token);
        setNewPlayList(response.data);
      } catch (error) {
        console.log("Hello");
        throw Error("Error fetching user playlist:");
      }
    }
    fetchUserPlayList();
  }, [token]);

  // Add the music
  const handleAdd = async (music: musicDataBase) => {
    const existingId = newPlayList.some((item) => item.id === music.id);

    const songIndex = newPlayList.findIndex((songs) => songs.id);
    if (songIndex !== -1) {
      await musicServices.addPlayListToStorage(token, music.id);
    }
    if (!existingId) {
      setNewPlayList([...newPlayList, music]);

      const updatedPlaylist = JSON.stringify([...newPlayList, music]);
      sessionStorage.setItem("playlist", updatedPlaylist);
    }
  };

  // Delete from playList and sesson storage
  const deleteSongFromList = async (id: string) => {
    const removeItem = newPlayList.filter((musics) => musics.id !== id);
    await musicServices.removeFromServers(token, id);

    setNewPlayList(removeItem);
    const updatedPlaylist = JSON.stringify(removeItem);
    sessionStorage.setItem("playlist", updatedPlaylist);
  };

  return (
    <div className="container card">
      <div className="m-5  p-2">
        <SearchMusic onSearch={handleSearch} />

        <br />

        <h4>Music List</h4>

        <table className="table table-hover table-active table-dark ">
          <thead className="thead-dark">
            <tr>
              <th>Index</th>
              <th>Release Date</th>
              <th>Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {totalMusic.length == 0 ? (
              <tr>
                <td>No Music Match search</td>
              </tr>
            ) : (
              totalMusic.map((music, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
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
                      <IoIosAddCircle
                        onClick={(e) => {
                          handleAdd(music);
                        }}
                      />
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <br />

        <br />
        <PlayList addMusic={newPlayList} deleteMusic={deleteSongFromList} />
        <br />
        <Sound musicList={newPlayList} />
      </div>
    </div>
  );
}
