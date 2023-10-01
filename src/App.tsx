import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Configuration, Game } from "./pages/index.ts";

const router = createBrowserRouter([
  { path: "/", Component: Configuration },
  { path: "game", Component: Game },
]);

// todo check the main class styles
export default function App() {
  return (
    <main className="h-screen flex justify-center items-center flex-col bg-black">
      <RouterProvider router={router} />
    </main>
  );
}
