import React, { useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import ProgressBar from "@ramonak/react-progress-bar";
import { MdSkipPrevious } from "react-icons/md";
import { MdSkipNext } from "react-icons/md";
import { FaCirclePause } from "react-icons/fa6";
import { BsRepeat1 } from "react-icons/bs";
import { FaVolumeHigh } from "react-icons/fa6";
export default function Sound() {
  let [progress, setProgress] = useState(0);
  const progressBar = () => {
    setProgress((prevProgress) => prevProgress + 100);
  };

  // const Player = () => (

  // );
  return (
    <div>
      <p>Song Title</p>
      <table className="table-playing">
        <tr className="tr-headers-playing">
          <td>
            <AudioPlayer
              autoPlay
              src="http://localhost:9000/music/mocking_bird.mp3"
              onPlay={(e) => console.log("onPlay")}
              // other props here
            />
          </td>
        </tr>
      </table>
      {/* <div>
        <div className="d-flex justify-content-between">
          <span>0.00</span>
          <span style={{ flex: "1 1 auto" }}>
            <ProgressBar completed={progress} />
          </span>
          <span>3.00</span>
        </div>
        <div className="d-flex justify-content-around">
          <span>
            <BsRepeat1 />
          </span>
          <div>
            <span>
              <MdSkipPrevious />
            </span>
            <span onClick={progressBar}>
              <FaCirclePause />
            </span>
            <span>
              <MdSkipNext />
            </span>
          </div>
          <div>
            <span>
              <FaVolumeHigh />
            </span>
            <span></span>
          </div>
        </div>
      </div> */}
    </div>
  );
}
