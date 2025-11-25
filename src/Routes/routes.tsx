import { createBrowserRouter } from "react-router-dom";
import Welcome from "../page/Welcome";
import Register from "../Auth/Register";
import Login from "../Auth/login";
import StudentGroupDashboard from "../Student/dashboard";

export const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "dashboard",
    element: <StudentGroupDashboard />,
  },
]);
