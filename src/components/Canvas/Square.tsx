interface SquareProps {
  color: string;
}

export default function Square({ color }: SquareProps) {
  return (
    <div
      className="aspect-square w-[60px] border-2"
      style={{ backgroundColor: color }}
    />
  );
}
