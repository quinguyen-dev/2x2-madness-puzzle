import { Square } from "../../model/Model";

interface GroupProps extends React.HTMLAttributes<HTMLDivElement> {
  group: Square[];
}

export default function Group({ group, style }: GroupProps) {
  return (
    <div className="grid grid-rows-2 grid-cols-2 absolute" style={style}>
      {group.map((square) => (
        <div
          className="aspect-square w-[60px] border-2 border-cyan-100"
          style={{ backgroundColor: square.color }}
        />
      ))}
    </div>
  );
}
