import React from "react";
import { IoIosAddCircle } from "react-icons/io";

export default function InterestSong() {
  return (
    <div className="mt-5">
      <h4>Add to Playlist</h4>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Index</th>
            <th>Title</th>
            <th>Release Data</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Music Title</td>
            <td>1999-12-12</td>
            <td>
              <IoIosAddCircle />
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>Music Title</td>
            <td>1999-12-12</td>
            <td>
              <IoIosAddCircle />
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>Music Title</td>
            <td>1999-12-12</td>
            <td>
              <IoIosAddCircle />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
