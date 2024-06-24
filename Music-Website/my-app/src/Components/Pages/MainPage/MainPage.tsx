import musicServices from "../../../apis/services/music.services";
import InterestSong from "../AddToPlayList/AddToPlayList.Song";
import { musicDataBase } from "../../../types/types";
import SearchMusic from "../Search/Search.music";
import PlayList from "../PlayList/PlayList.music";
import { IoIosAddCircle } from "react-icons/io";
import { useEffect, useState } from "react";
import Sound from "../PlaySound/Sound.music";
import "./mainPage.css";

export default function MainPage() {
  const [totalMusic, setTotalMusic] = useState<musicDataBase[]>([]);
  const [searched, setSearched] = useState(false);

  // State for player list
  const [newPlayList, setNewPlayList] = useState<musicDataBase[]>([]);

  // Get Total Music
  const token = sessionStorage.getItem("token") as string;
  useEffect(() => {
    async function totalSong() {
      const response = await musicServices.getTotalSong(token);
      setTotalMusic(response.data);
    }
    totalSong();
  }, []);

  const handleSearch = () => {
    setSearched(true);
  };

  // Add the music: Not working for searched music
  const handleAdd = (music: musicDataBase) => {
    const existingId = newPlayList.some((item) => item.id === music.id);

    if (!existingId) {
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

  // Send the added music from playList to sound
  const play = (music: musicDataBase) => {};
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
              {totalMusic.map((music, index) => (
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
      <Sound musicList={newPlayList} />
    </div>
  );
}
