import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootPage from "./page/root/root";
import LoginPage from "./page/login/login";
import RegisterPage from "./page/register/register";
import TaskPage from "./page/task/task";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <RootPage></RootPage>,
    children: [
      { path: "/", element: <LoginPage></LoginPage> },
      { path: "/Register", element: <RegisterPage></RegisterPage> },
      { path: "/Board", element: <TaskPage></TaskPage> },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={routers}></RouterProvider>
    </>
  );
}

export default App;
