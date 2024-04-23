import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./search.css";
import apple from "../Search/apple.jpg";
type Props = {
  onSearch: (result: any) => void;
};

export default function SearchMusic(props: Props) {
  const { onSearch } = props;
  const navigate = useNavigate();

  // Search for music
  const [userSearch, setUserSearch] = useState("");
  const handleInput = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const result = e.currentTarget.value.trim();
      onSearch(result);
    }
  };

  // From page LogOut: Remove the token and navigate base to login
  const handleLogOut = () => {
    // sessionStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar ">
      <div className="container-fluid d-flex justify-content-around align-items-center ">
        <img className="mb-4" src={apple} alt="" width="130" height="120" />
        <div className="form-group ">
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
  );
}
