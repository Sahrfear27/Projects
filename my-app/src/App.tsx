import "bootstrap/dist/css/bootstrap.css";
import Login from "./Components/LogIn/login";
import MainPage from "./Components/Pages/MainPage/MainPage";
import routes from "./Routes/routes";
import { useRoutes } from "react-router-dom";

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
