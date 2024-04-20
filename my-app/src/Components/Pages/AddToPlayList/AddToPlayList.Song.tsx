import { useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { searchResponse } from "../../../types/types";
import { musicDataBase } from "../../../types/types";

type Props = {
  songList: any;
};
export default function InterestSong(props: Props) {
  const { songList } = props;

  //Subscribe to the data that was published from Search
  const [searchedResponse, setSearchedResponse] = useState<searchResponse>({
    isFirst: true,
    isLoading: false,
    isError: false,
    playList: [],
  });
  //

  useEffect(() => {
    const token = PubSub.subscribe("musicList", (msg, data) => {
      console.log("---inside songs---");
      console.log(data);
      setSearchedResponse(data);

      console.log("---inside songs---");
      // console.log(data);
    });
    return () => {
      PubSub.unsubscribe(token);
    };
  }, []);

  const { isFirst, isLoading, isError, playList } = searchedResponse;
  console.log(playList);
  return (
    <div className="mt-5">
      <h4>Add to Playlist</h4>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Index</th>
            <th>Release Date</th>
            <th>Title</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {isFirst ? (
              <th>Search for Music</th>
            ) : isLoading ? (
              <th>Please Wait</th>
            ) : isError ? (
              <th>Whoops!. sorry</th>
            ) : (
              <>
                {playList.map((response) => {
                  return (
                    <>
                      <td>{response.id}</td>;<td>{response.title}</td>;
                      <td>{response.releaseDate}</td>;
                    </>
                  );
                })}
                <td>
                  <IoIosAddCircle />
                </td>
              </>
            )}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
