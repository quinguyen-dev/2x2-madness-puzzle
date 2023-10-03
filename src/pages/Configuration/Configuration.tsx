import { ConfigButton } from "../../components";

export default function Configuration() {
  return (
    <div className="text-white">
      <h1 className="text-6xl font-black select-none">2x2 Madness</h1>
      <div className="flex flex-col space-y-2 mt-6 text-black">
        <ConfigButton config={0}>[4x4] Easy</ConfigButton>
        <ConfigButton config={1}>[5x5] Medium</ConfigButton>
        <ConfigButton config={2}>[6x6] Hard</ConfigButton>
      </div>
    </div>
  );
}
