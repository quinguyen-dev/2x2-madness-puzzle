import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Configuration, Game } from "./pages/index.ts";

const router = createBrowserRouter([
  { path: "/", Component: Configuration },
  { path: "game", Component: Game },
]);

export default function App() {
  return (
    <main className="h-screen flex justify-center items-center flex-col bg-gradient-radial from-[#121212] to-[#000000]">
      <RouterProvider router={router} />
    </main>
  );
}
