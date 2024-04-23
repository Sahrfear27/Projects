import { musicDataBase } from "../../../types/types";
import { FaRegCirclePlay } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import PubSub from "pubsub-js";
import "./playList.css";

type Props = {
  addMusic: musicDataBase[];
  deleteMusic: (id: string) => void;
};
export default function PlayList(props: Props) {
  const { addMusic, deleteMusic } = props;

  return (
    <div className="m-5 playCard ">
      <h4>PlayList</h4>
      <table className="table table-hover table-dark ">
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
              <td>{index + 1}</td>
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
                    <a>
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
