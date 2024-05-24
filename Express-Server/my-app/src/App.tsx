import "bootstrap/dist/css/bootstrap.css";
import routes from "./Routes/routes";
import { useRoutes } from "react-router-dom";
import "react-h5-audio-player/lib/styles.css";
import "./App.css";
function App() {
  const element = useRoutes(routes);
  return <div>{element}</div>;
}

export default App;
