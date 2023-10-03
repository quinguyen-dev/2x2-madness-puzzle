import { useEffect, useReducer, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { cloneDeep } from "lodash";
import modelReducer, { ControllerActionType } from "../../context/modelReducer";
import redrawCanvas from "../../context/redrawCanvas";
import { Group } from "../../components";
import Model from "../../model/Model";
import type { Square } from "../../model/Model";

enum Direction {
  COUNTERCLOCKWISE = 0,
  CLOCKWISE = 1,
}

export default function Game() {
  const configuration = parseInt(localStorage.getItem("config") || "0");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [state, dispatch] = useReducer(modelReducer, new Model(configuration));
  const [settings, setSettings] = useState(false);
  const [rotate, setRotate] = useState(0);
  const [clone, setClone] = useState<{ point: number; selected: Square[] }>({
    point: 0,
    selected: [],
  });

  const { size, point, selected, moves, quadrantsLeft } = state.board;
  const activePoint = point.y * (size - 1) + point.x;

  useEffect(() => {
    /* Redraw underlying canvas */
    if (canvasRef.current !== null) redrawCanvas(state, canvasRef.current);

    /* Determine if a new point was clicked */
    if (clone.point !== activePoint) {
      setClone({ point: activePoint, selected: cloneDeep(selected) });
      setRotate(0);
    }
  }, [state]);

  /* Action for clicking a node */
  const nodeClicked = (key: number) =>
    dispatch({ type: ControllerActionType.PROCESS_CLICK, key: key });

  /* Action for rotating a group */
  const rotateGroup = (direction: Direction) => {
    if (point.x >= 0)
      dispatch({
        type: ControllerActionType.ROTATE_GROUP,
        direction: direction,
      });
  };

  /* Action for resetting the game */
  const resetGame = (config: number) =>
    dispatch({ type: ControllerActionType.RESET_GAME, config: config });

  return (
    <>
      <div
        className={`w-1/2 flex flex-col items-center h-3/4 justify-center relative ${
          settings || quadrantsLeft === 0
            ? "opacity-50 pointer-events-none"
            : "opacity-100 pointer-events-auto"
        }`}
        style={{ minWidth: 60 * size }}
      >
        {/* Settings button */}
        <button
          aria-label="Settings"
          className="absolute top-0 right-0"
          onClick={() => setSettings(true)}
        >
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            height="28"
            viewBox="4 4 24 24"
            width="28"
          >
            <path
              fill="white"
              d="M25.52 17.2534C25.5733 16.8534 25.6 16.44 25.6 16C25.6 15.5734 25.5733 15.1467 25.5067 14.7467L28.2133 12.64C28.4533 12.4534 28.52 12.0934 28.3733 11.8267L25.8133 7.40004C25.6533 7.10671 25.32 7.01338 25.0267 7.10671L21.84 8.38671C21.1733 7.88004 20.4667 7.45338 19.68 7.13338L19.2 3.74671C19.1467 3.42671 18.88 3.20004 18.56 3.20004H13.44C13.12 3.20004 12.8666 3.42671 12.8133 3.74671L12.3333 7.13338C11.5467 7.45338 10.8267 7.89338 10.1733 8.38671L6.98665 7.10671C6.69332 7.00004 6.35998 7.10671 6.19998 7.40004L3.65332 11.8267C3.49332 12.1067 3.54665 12.4534 3.81332 12.64L6.51998 14.7467C6.45332 15.1467 6.39998 15.5867 6.39998 16C6.39998 16.4134 6.42665 16.8534 6.49332 17.2534L3.78665 19.36C3.54665 19.5467 3.47998 19.9067 3.62665 20.1734L6.18665 24.6C6.34665 24.8934 6.67998 24.9867 6.97332 24.8934L10.16 23.6134C10.8267 24.12 11.5333 24.5467 12.32 24.8667L12.8 28.2534C12.8667 28.5734 13.12 28.8 13.44 28.8H18.56C18.88 28.8 19.1467 28.5734 19.1867 28.2534L19.6667 24.8667C20.4533 24.5467 21.1733 24.12 21.8267 23.6134L25.0133 24.8934C25.3067 25 25.64 24.8934 25.8 24.6L28.36 20.1734C28.52 19.88 28.4533 19.5467 28.2 19.36L25.52 17.2534ZM16 20.8C13.36 20.8 11.2 18.64 11.2 16C11.2 13.36 13.36 11.2 16 11.2C18.64 11.2 20.8 13.36 20.8 16C20.8 18.64 18.64 20.8 16 20.8Z"
            ></path>
          </svg>
        </button>

        {/* Board rendering */}
        <div
          className="flex justify-center items-center relative aspect-square"
          style={{ width: 60 * size }}
        >
          <div
            className="absolute aspect-square grid justify-items-center items-center p-[30px] w-full"
            style={{
              gridTemplate: `repeat(${size - 1}, 1fr) / repeat(${
                size - 1
              }, 1fr)`,
            }}
          >
            {[...Array(Math.pow(size - 1, 2)).keys()].map((key) => (
              <button
                aria-label={`Point ${key}`}
                key={key}
                style={{
                  backgroundColor:
                    point.y * (size - 1) + point.x === key &&
                    selected.length !== 0
                      ? "red"
                      : "",
                }}
                className="bg-white rounded-xl z-20 w-6 aspect-square border-2 border-black hover:bg-red-300"
                onClick={() => nodeClicked(key)}
              />
            ))}
            <div className="absolute w-full h-full">
              <div
                className="absolute bg-black"
                style={{
                  left: point.x * 60,
                  top: point.y * 60,
                }}
              >
                {clone.point === activePoint && (
                  <Group
                    style={{
                      transform: `rotateZ(${rotate}deg)`,
                      transition:
                        rotate === 0 && clone.point !== activePoint
                          ? "all -1s linear"
                          : "all 0.2s linear",
                    }}
                    group={clone.selected}
                  />
                )}
              </div>
            </div>
          </div>
          <canvas
            data-testid="canvas"
            ref={canvasRef}
            width={size * 60}
            height={size * 60}
          />
        </div>

        {/* Controls and stats */}
        <div className="text-white mt-4 font-bold text-center">
          Move count: {moves}
        </div>
        <div
          className="flex justify-center mt-4 space-x-2 "
          style={{ width: size * 60 }}
        >
          <button
            aria-label="Rotate the group counterclockwise"
            className="border-2 border-white text-white p-2 w-full hover:bg-white hover:text-black"
            onClick={() => {
              rotateGroup(Direction.COUNTERCLOCKWISE);
              setRotate(rotate - 90);
            }}
          >
            Rotate left
          </button>
          <button
            aria-label="Rotate the group clockwise"
            className="border-2 border-white text-white p-2 w-full hover:bg-white hover:text-black"
            onClick={() => {
              rotateGroup(Direction.CLOCKWISE);
              setRotate(rotate + 90);
            }}
          >
            Rotate right
          </button>
        </div>
      </div>

      {/* Settings screen */}
      {settings && (
        <div className="absolute z-40 max-w-[400px] w-full p-4 bg-[#121214] text-white border-2 border-gray-700 flex flex-col">
          <div className="flex justify-between">
            <h1 className="text-xl font-bold inline">Settings</h1>
            <button
              aria-label="Close the settings menu"
              className="text-xl cursor-clickable"
              onClick={() => setSettings(false)}
            >
              X
            </button>
          </div>
          <Link
            to="/"
            className="p-2 border-2 border-cyan-600 w-full mt-3 bg-cyan-600 hover:bg-cyan-700 hover:border-cyan-700"
          >
            Play another configuration
          </Link>
          <button
            aria-label="Reset the game"
            className="text-left mt-2 p-2 box-border border-2 border-red-600 bg-red-600 hover:bg-red-700 hover:border-red-700"
            onClick={() => {
              resetGame(configuration);
              setSettings(false);
            }}
          >
            Reset game
          </button>
        </div>
      )}

      {/* Winning message */}
      {quadrantsLeft === 0 && (
        <div className="bg-[#121214] text-white border-2 border-gray-700 absolute z-30 flex p-4 flex-col">
          <h1 className="text-2xl text-center">
            You solved the puzzle in{" "}
            <span className="font-bold text-green-600">{moves} moves!</span>
            <br />
            Try another
          </h1>
          <div className="flex mt-4 space-x-4 space-between text-black h-12">
            <button
              aria-label="Play the 4x4 configuration"
              className="border-white border-2 text-white w-full justify-center items-center flex hover:bg-white hover:text-black"
              onClick={() => resetGame(0)}
            >
              4x4
            </button>
            <button
              aria-label="Play the 5x5 configuration"
              className="border-white border-2 text-white w-full justify-center items-center flex hover:bg-white hover:text-black"
              onClick={() => resetGame(1)}
            >
              5x5
            </button>
            <button
              aria-label="Play the 6x6 configuration"
              className="border-white border-2 text-white w-full justify-center items-center flex hover:bg-white hover:text-black"
              onClick={() => resetGame(2)}
            >
              6x6
            </button>
          </div>
        </div>
      )}
    </>
  );
}
