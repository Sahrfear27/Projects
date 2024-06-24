import { useRoutes } from "react-router-dom";
import "react-h5-audio-player/lib/styles.css";
import "bootstrap/dist/css/bootstrap.css";
import routes from "./Routes/routes";

function App() {
  const element = useRoutes(routes);
  return (
    <div>
      {element}
      {/* <MainPage /> */}
    </div>
  );
}

export default App;
