import { Outlet } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true;
const App = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default App;
