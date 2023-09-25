import { Canvas } from "./components";
import Model from "./model/Model";

export default function App() {
  const model = new Model();

  function rotateRight() {}

  return (
    <main className="h-screen flex justify-center items-center flex-col bg-black">
      <Canvas model={model} />
      <div className="space-x-4 pt-4">
        <button className="bg-white p-2 rounded-md" onClick={rotateRight}>
          Rotate left
        </button>
        <button className="bg-white p-2 rounded-md">Rotate right</button>
      </div>
    </main>
  );
}
