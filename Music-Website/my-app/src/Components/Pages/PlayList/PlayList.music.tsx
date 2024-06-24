import { MdDelete } from "react-icons/md";
import { FaRegCirclePlay } from "react-icons/fa6";

import { musicDataBase } from "../../../types/types";

import PubSub from "pubsub-js";
type Props = {
  addMusic: musicDataBase[];
  onAddMusicToPlayList: (music: musicDataBase) => void;
  deleteMusic: (id: string) => void;
};
export default function PlayList(props: Props) {
  const { addMusic, onAddMusicToPlayList, deleteMusic } = props;

  PubSub.publish("play", addMusic);

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
          {addMusic.map((music, index) => (
            <tr key={index}>
              <td>{index}</td>
              <td>{music.title}</td>

              <td>
                <p className="d-flex justify-content-around align-items-center">
                  <span>
                    <a
                      href="#"
                      className="pe-auto text-secondary"
                      onClick={(e) => deleteMusic(music.id)}
                    >
                      <MdDelete />
                    </a>
                  </span>
                  <span>
                    <a
                      href="#"
                      className="pe-auto text-secondary "
                      onClick={(e) => {
                        onAddMusicToPlayList(music);
                      }}
                    >
                      <FaRegCirclePlay
                        onClick={() => {
                          PubSub.publish("playMusic", music);
                        }}
                      />
                    </a>
                  </span>
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
