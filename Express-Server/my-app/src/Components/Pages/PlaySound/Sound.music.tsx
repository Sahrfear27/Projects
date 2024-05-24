import { useEffect, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import PubSub from "pubsub-js";
import { musicDataBase } from "../../../types/types";

type Props = {
  musicList: musicDataBase[];
};
export default function Sound(props: Props) {
  const [play, setPlay] = useState<musicDataBase[]>([]);
  const [currentMusicId, setCurrentMusicId] = useState<String>("");

  const { musicList } = props;
  useEffect(() => {
    const token = PubSub.subscribe("playMusic", (msg, data) => {
      setPlay(Array.isArray(data) ? data : [data]);
      setCurrentMusicId(data.id);
    });
    if (play.length === 0 && musicList.length > 0) {
      setPlay([musicList[0]]);
      setCurrentMusicId(musicList[0].id);
    }
    return () => {
      PubSub.unsubscribe(token);
    };
  }, [play, musicList]);

  const handleClickNext = () => {
    musicList.map((music, index) => {
      if (music.id === currentMusicId && index + 1 < musicList.length) {
        PubSub.publish("playMusic", musicList[index + 1]);
      }
    });
  };
  const handlePreviousClick = () => {
    const currentIndex = musicList.findIndex(
      (music) => music.id === currentMusicId
    );
    if (currentIndex !== -1 && currentIndex > 0) {
      const previusIndex = musicList[currentIndex - 1];
      PubSub.publish("playMusic", previusIndex);
    }
    musicList.map((music, index) => {
      if (music.id === currentMusicId && musicList.length > index + 1) {
        // console.log(music.title, index);
        PubSub.publish("playlist", musicList[musicList.length - 1]);
      }
    });
  };
  return (
    <div className="container mb-4 ">
      {play.map((music, index) => (
        <div key={index}>
          <p>{music.title}</p>
          <AudioPlayer
            key={index}
            volume={0.5}
            autoPlay
            src={`http://localhost:9000/${music.urlPath}`}
            showSkipControls
            onClickNext={handleClickNext}
            onClickPrevious={handlePreviousClick}
            onError={() => {
              console.log("play error");
            }}
          />
        </div>
      ))}
    </div>
  );
}
