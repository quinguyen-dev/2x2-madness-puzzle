import { Link } from "react-router-dom";

interface ConfigButtonProps {
  config: number;
  children: any;
}

export default function ConfigButton({ config, children }: ConfigButtonProps) {
  return (
    <Link
      to="/game"
      onClick={() => localStorage.setItem("config", config.toString())}
      className="bg-white w-full rounded-lg justify-center items-center flex"
    >
      {...children}
    </Link>
  );
}
