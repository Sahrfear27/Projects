import { FaMusic } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
// import musicServices from "../../../apis/services/music.services";
import PubSub from "pubsub-js";
import { ChangeEvent, useRef, useState } from "react";
import { get } from "http";
import musicServices from "../../../apis/services/music.services";
import { searchResponse } from "../../../types/types";

export default function SearchMusic() {
  // const elements = useRoutes(routes);
  const navigate = useNavigate();
  /*
  steps:
  1. Receive a method from mainPage as props to send list of songs, Send a get request and pass the data through the method from parent

  2. Publish the subscriber to the component using the data: Send the data to playList Components
  */
  // const inputRef = useRef<HTMLInputElement>(null);
  const [userSearch, setUserSearch] = useState("");
  const handleInput = async (e: ChangeEvent<HTMLInputElement>) => {
    const result = e.currentTarget.value;
    try {
      PubSub.publish("musicList", {
        isFirst: false,
        isLoading: true,
        isError: false,
        playList: [],
      });
      const response = await musicServices.getSong(`q=${userSearch}`);
      if (response?.status === 200) {
        console.log(response.data);
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
  };

  // Clear user authentation state and redirect back to login
  const handleLogOut = () => {
    sessionStorage.removeItem("token");
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
              onChange={handleInput}
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
