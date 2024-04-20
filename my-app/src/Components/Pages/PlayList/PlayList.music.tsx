import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaRegCirclePlay } from "react-icons/fa6";
import { searchResponse } from "../../../types/types";

export default function PlayList() {
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
