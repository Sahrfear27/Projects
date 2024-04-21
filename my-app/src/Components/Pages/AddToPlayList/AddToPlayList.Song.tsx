import React, { useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { searchResponse } from "../../../types/types";

export default function InterestSong() {
  // Subscribe to the data that was published from Search
  const [searchedResponse, setSearchedResponse] = useState<searchResponse>({
    isFirst: true,
    isLoading: false,
    isError: false,
    playList: [],
  });

  useEffect(() => {
    const token = PubSub.subscribe("musicList", (msg, data) => {
      setSearchedResponse(data);
    });
    return () => {
      PubSub.unsubscribe(token);
    };
  }, []);

  const { isFirst, isLoading, isError, playList } = searchedResponse;

  return (
    <div className="mt-5">
      <h4>Add to Playlist</h4>
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
          {isFirst ? (
            <tr>
              <th colSpan={4}>Search for Music</th>
            </tr>
          ) : isLoading ? (
            <tr>
              <th colSpan={4}>Please Wait</th>
            </tr>
          ) : isError ? (
            <tr>
              <th colSpan={4}>Whoops! Sorry</th>
            </tr>
          ) : playList.length === 0 ? (
            <tr>
              <th colSpan={4}>Music is not in list</th>
            </tr>
          ) : (
            playList.map((response, index) => (
              <tr key={index}>
                <td>{index}</td>
                <td>{response.releaseDate}</td>
                <td>{response.title}</td>
                <td>
                  <a href="#" className="pe-auto text-secondary">
                    <IoIosAddCircle />
                  </a>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
