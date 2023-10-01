import { Square } from "../../model/Model";

interface GroupProps extends React.HTMLAttributes<HTMLDivElement> {
  group: Square[];
}

export default function Group({ group, style }: GroupProps) {
  return (
    <div
      aria-label="Selected group"
      className="grid grid-rows-2 grid-cols-2 absolute"
      style={style}
    >
      {group.map((square, i) => (
        <div
          key={i}
          className="aspect-square w-[60px] border-2 border-red-600"
          style={{
            backgroundColor:
              square.color === "undefined" ? "white" : square.color,
          }}
        />
      ))}
    </div>
  );
}
