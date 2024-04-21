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

// // Keep:
// function Sounds() {
//   const [progress, setProgress] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [currentMusicIndex, setCurrentMusicIndex] = useState<number>(0);
//   const [play, setPlay] = useState<musicDataBase[]>([]);

//   const handlePlay = () => {
//     console.log("Play button clicked");
//   };

//   const handlePause = () => {
//     console.log("Pause button clicked");
//   };

//   const handleNext = () => {
//     if (currentMusicIndex < play.length - 1) {
//       setCurrentMusicIndex(currentMusicIndex + 1);
//     } else {
//       setCurrentMusicIndex(0);
//     }
//     console.log("Next button clicked");
//   };

//   const handlePrevious = () => {
//     console.log("Previous button clicked");
//   };

//   const handleRepeat = () => {
//     console.log("Repeat button clicked");
//   };

//   useEffect(() => {
//     const token = PubSub.subscribe("playMusic", (msg, data) => {
//       setPlay(Array.isArray(data) ? data : [data]);
//     });
//     return () => {
//       PubSub.unsubscribe(token);
//     };
//   }, []);

//   return (
//     <div>
//       <div>
//         {play.map((songs, index) => (
//           <div key={index}>
//             <p>{songs.title}</p>
//             <AudioPlayer
//               key={index}
//               src={`http://localhost:9000/${songs.urlPath}`}
//               onPlay={handlePlay}
//               onPause={handlePause}
//               onEnded={handleNext}
//               listenInterval={1000}
//               onListen={(e) => {
//                 const audioElement = e.target as HTMLAudioElement;
//                 setDuration(audioElement.duration);
//                 setCurrentTime(audioElement.currentTime);
//               }}

//               // other props here
//             />
//           </div>
//         ))}
//       </div>
//       <div>
//         <div className="d-flex justify-content-between">
//           <span>{currentTime.toFixed(2)}</span>
//           <span style={{ flex: "1 1 auto" }}>
//             <ProgressBar
//               completed={(currentTime / duration) * 100}
//               bgColor="#00695c"
//             />
//           </span>
//           <span>{duration.toFixed(2)}</span>
//         </div>
//         <div className="d-flex justify-content-around">
//           <span onClick={handleRepeat}>
//             <BsRepeat1 />
//           </span>
//           <div>
//             <span onClick={handlePrevious}>
//               <MdSkipPrevious />
//             </span>
//             <span onClick={handlePlay}>
//               <FaCirclePause />
//             </span>
//             <span onClick={handleNext}>
//               <MdSkipNext />
//             </span>
//           </div>
//           <div>
//             <span>
//               <FaVolumeHigh />
//             </span>
//             <span></span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// export default Sound;
