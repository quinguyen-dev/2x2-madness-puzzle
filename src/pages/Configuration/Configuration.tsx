import ConfigButton from "./ConfigButton";

export default function Configuration() {
  return (
    <div className="text-white">
      <h1 className="text-6xl">2x2 Madness</h1>
      <div className="flex mt-8 space-x-4 space-between text-black h-12">
        <ConfigButton config={0}>4x4</ConfigButton>
        <ConfigButton config={1}>5x5</ConfigButton>
        <ConfigButton config={2}>6x6</ConfigButton>
      </div>
    </div>
  );
}
