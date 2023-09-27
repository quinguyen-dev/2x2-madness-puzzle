export default function Node({
  onClick,
  style,
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="bg-white rounded-xl h-6 w-6 border-2 border-black hover:bg-red-300 absolute"
      onClick={onClick}
      style={style}
    />
  );
}
