import { Outlet } from "react-router-dom";
import axios from "axios";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.withCredentials = true;
const App = () => {
  return (
    <>
      <Outlet />
      <ToastContainer />
    </>
  );
};

export default App;
