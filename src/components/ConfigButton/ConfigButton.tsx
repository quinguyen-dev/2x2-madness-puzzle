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
      className="text-white h-12 border-2 border-white flex items-center p-0 relative group cursor-clickable"
    >
      <div className="absolute w-0 bg-white inset-0 transition-all duration-[300ms] ease group-hover:w-full"></div>
      <span className="relative pl-4 group-hover:text-black group-hover:font-bold">
        {...children}
      </span>
    </Link>
  );
}
