import React, { useEffect, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import ProgressBar from "@ramonak/react-progress-bar";
import { MdSkipPrevious, MdSkipNext } from "react-icons/md";
import { FaCirclePause } from "react-icons/fa6";
import { BsRepeat1 } from "react-icons/bs";
import { FaVolumeHigh } from "react-icons/fa6";
import PubSub from "pubsub-js";
import { musicDataBase } from "../../../types/types";
import http from "../../../apis/axios";

interface PlaylistItem {
  src: string;
}

interface ReactH5AudioPlayer {
  default: React.ComponentType<any>;
}
type Props = {
  musicList: musicDataBase[];
};
export default function Sound(props: Props) {
  const [play, setPlay] = useState<musicDataBase[]>([]);
  const [currentMusicId, setCurrentMusicIndex] = useState<String>("");

  const { musicList } = props;
  useEffect(() => {
    const token = PubSub.subscribe("playMusic", (msg, data) => {
      // console.log(data, " music played");
      setPlay(Array.isArray(data) ? data : [data]);
      setCurrentMusicIndex(data.id);
    });
    return () => {
      PubSub.unsubscribe(token);
    };
  }, []);

  const handleClickNext = () => {
    console.log("next ", musicList, " current music id ", currentMusicId);
    musicList.map((music, index) => {
      if (music.id == currentMusicId && index + 1 < musicList.length) {
        console.log(music.title, index);
        PubSub.publish("playMusic", musicList[index + 1]);
      }
    });
  };
  const handlePreviousClick = () => {};
  const handleEnd = () => {
    // setCurrentMusicIndex((currentTrack) =>
    //   currentTrack < play.length - 1 ? currentTrack + 1 : 0
    // );
  };

  return (
    <div className="container">
      {play.map((music, index) => (
        <div key={index}>
          <p>{music.title}</p>
          <AudioPlayer
            key={index}
            volume={0.5}
            src={`http://localhost:9000/${music.urlPath}`}
            showSkipControls
            onClickNext={handleClickNext}
            onEnded={handleEnd}
            onError={() => {
              console.log("play error");
            }}
          />
        </div>
      ))}
    </div>
  );
}
