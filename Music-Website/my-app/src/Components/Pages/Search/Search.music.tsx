import musicServices from "../../../apis/services/music.services";
import { useNavigate } from "react-router-dom";
import { FaMusic } from "react-icons/fa";
import React, { useState } from "react";
import PubSub from "pubsub-js";

type Props = {
  onSearch: () => void;
};

export default function SearchMusic(props: Props) {
  const { onSearch } = props;
  const navigate = useNavigate();

  // Search for music
  const [userSearch, setUserSearch] = useState("");
  const handleInput = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const result = e.currentTarget.value.trim();
      onSearch();
      if (result) {
        try {
          PubSub.publish("musicList", {
            isFirst: false,
            isLoading: true,
            isError: false,
            playList: [],
          });
          const response = await musicServices.getSong(result);
          // If the response status is correct, send the response to the AddplayList
          if (response?.status === 200) {
            PubSub.publish("musicList", {
              isFirst: false,
              isLoading: false,
              isError: false,
              playList: response.data,
            });
          }
        } catch (error) {
          PubSub.publish("musicList", {
            isFirst: false,
            isLoading: false,
            isError: true,
            playList: [],
          });
        }
      }
      setUserSearch("");
    }
  };

  const handleLogOut = () => {
    navigate("/");
  };

  return (
    <div>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid d-flex justify-content-around align-items-center">
          <a className="navbar-brand">
            <FaMusic />
          </a>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              value={userSearch}
              onKeyUp={handleInput}
              onChange={(e) => setUserSearch(e.target.value)}
            />
          </div>

          <button
            className="btn btn-outline-success"
            type="submit"
            onClick={handleLogOut}
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
}
