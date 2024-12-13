import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import LockCard from "./pages/LockCard";



const router = createBrowserRouter([
  {
   path: "/:id",
    element: <div>
        <Home />

    </div>,
  },
  {
    path: "/lockCard",
     element: <div>
         <LockCard />
 
     </div>,
   },


]);

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
