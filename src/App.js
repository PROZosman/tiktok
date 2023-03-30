import Login from "./pages/Login"
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Registration from "./pages/Registration";
import Loggedin from "./pages/PrivetRouter/Loggedin";
import NotLoggedin from "./pages/PrivetRouter/NotLoggedin";
import Home from "./pages/Home"
import Forgot from "./pages/forgot";
import About from "./pages/About";
import Rootlayout from "./Rootlayout";


function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route>

      <Route element={<Loggedin />}>
        <Route element={<Rootlayout />}>
          <Route path="/" element={<Home />} ></Route>
          <Route path="/about" element={<About />} ></Route>
        </Route>
      </Route>

      <Route element={<NotLoggedin />}>
        <Route path="/registration" element={<Registration />} ></Route>
        <Route path="/login" element={<Login />} ></Route>
        <Route path="/forgot" element={<Forgot />}></Route>

      </Route>


    </Route>
  ));

  return (
    <>
      <RouterProvider router={router} ></RouterProvider>
    </>
  );
}

export default App;
