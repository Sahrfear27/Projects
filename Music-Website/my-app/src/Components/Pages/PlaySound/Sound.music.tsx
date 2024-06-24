import { musicDataBase } from "../../../types/types";
import React, { useEffect, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import PubSub from "pubsub-js";

type Props = {
  musicList: musicDataBase[];
};
export default function Sound(props: Props) {
  const [play, setPlay] = useState<musicDataBase[]>([]);
  const [currentMusicId, setCurrentMusicIndex] = useState<String>("");

  const { musicList } = props;
  useEffect(() => {
    const token = PubSub.subscribe("playMusic", (msg, data) => {
      console.log(data, " music played");
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

  const handleEnd = () => {};

  return (
    <div className="container">
      {play.map((music, index) => (
        <div key={index}>
          <p>{music.title}</p>
          <AudioPlayer
            key={index}
            volume={0.5} // Corrected volume prop to use number instead of string
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
