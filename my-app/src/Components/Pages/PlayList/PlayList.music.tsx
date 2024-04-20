import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaRegCirclePlay } from "react-icons/fa6";
import { searchResponse } from "../../../types/types";
import { Response } from "../../../types/types";
type Song = {
  id: string;
  userId: string;
  songId: string;
  orderId: number;
  title: string;
  urlPath: string;
};
export default function PlayList() {
  //Subscribe to the data that was published from searched
  const [searchedResponse, setSearchedResponse] = useState({
    isFirst: true,
    isLoading: false,
    isError: false,
  });
  //

  return (
    <div className="mt-5">
      <h4>PlayList</h4>
      <table className="table table-hover ">
        <thead>
          <tr>
            <th>Index</th>
            <th>Title</th>

            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Music Title</td>

            <td>
              <p className="d-flex justify-content-around align-items-center">
                <span>
                  <MdDelete />
                </span>
                <span>
                  <FaRegCirclePlay />
                </span>
              </p>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>Music Title</td>

            <td>
              <p className="d-flex justify-content-around align-items-center">
                <span>
                  <MdDelete />
                </span>
                <span>
                  <FaRegCirclePlay />
                </span>
              </p>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>Music Title</td>

            <td>
              <p className="d-flex justify-content-around align-items-center">
                <span>
                  <MdDelete />
                </span>
                <span>
                  <FaRegCirclePlay />
                </span>
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
