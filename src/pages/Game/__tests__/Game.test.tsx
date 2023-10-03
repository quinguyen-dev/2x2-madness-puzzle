import { render, screen, fireEvent } from "@testing-library/react";
import Game from "../Game";

beforeEach(() => localStorage.clear());

describe("[Game] Rendering", () => {
  it("should render correctly with default config", () => {
    const component = render(<Game />);
    expect(component).toMatchSnapshot();

    const canvas = component.getByTestId(/canvas/) as HTMLCanvasElement;

    expect(canvas.width).toBe(240);
    expect(canvas.height).toBe(240);
  });

  it("should render the canvas at 300x300 with a the 5x5 config", () => {
    localStorage.setItem("config", "1");

    render(<Game />);
    const canvas = screen.getByTestId(/canvas/) as HTMLCanvasElement;

    expect(canvas.width).toBe(300);
    expect(canvas.height).toBe(300);
  });

  it("should not show the completion options", () => {
    render(<Game />);
    const newGameButton = screen.queryByLabelText(/Play the 4x4 configuration/);
    expect(newGameButton).toBeNull();
  });
});

describe("[Game] Events", () => {
  beforeEach(() => {
    render(<Game />);
  });

  it("should have the background as red for a clicked point and not for others", () => {
    const points = screen.getAllByLabelText(/Point \d+/);
    expect(points.length).toBe(9);

    fireEvent.click(points[0]);
    expect(points[0].style.backgroundColor).toBe("red");

    for (let i = 1; i < 9; i++)
      expect(points[i].style.backgroundColor).not.toBe("red");

    fireEvent.click(points[8]);
    expect(points[8].style.backgroundColor).toBe("red");

    for (let i = 0; i < 8; i++)
      expect(points[i].style.backgroundColor).not.toBe("red");
  });

  it("should reset the board when the reset button is clicked", () => {
    const point = screen.getByLabelText(/Point 0/);
    const rotate = screen.getByText(/Rotate right/);

    fireEvent.click(point);
    fireEvent.click(rotate);

    let moves = screen.getByText(/Move count: 1/);
    expect(moves).toBeInTheDocument();

    const reset = screen.getByText(/Reset/);
    fireEvent.click(reset);

    moves = screen.getByText(/Move count: 0/);
    expect(moves).toBeInTheDocument();
  });

  it("should rotate the colors clockwise", () => {
    const point = screen.getByLabelText(/Point 0/);
    fireEvent.click(point);

    const squares = screen.getByLabelText(/Selected group/)
      .children as HTMLCollectionOf<HTMLDivElement>;
    expect(squares[0].style.backgroundColor).toBe("green");
    expect(squares[1].style.backgroundColor).toBe("yellow");
    expect(squares[2].style.backgroundColor).toBe("green");
    expect(squares[3].style.backgroundColor).toBe("grey");

    const rotate = screen.getByText(/Rotate right/);
    fireEvent.click(rotate);

    expect(squares[0].style.backgroundColor).toBe("green");
    expect(squares[1].style.backgroundColor).toBe("green");
    expect(squares[2].style.backgroundColor).toBe("grey");
    expect(squares[3].style.backgroundColor).toBe("yellow");
  });
});

describe("[Game] Events while solving a quadrant", () => {
  beforeEach(() => {
    render(<Game />);

    const pointZero = screen.getByLabelText(/Point 0/);
    const pointThree = screen.getByLabelText(/Point 3/);
    const pointSix = screen.getByLabelText(/Point 6/);
    const right = screen.getByText(/Rotate right/);
    const left = screen.getByText(/Rotate left/);

    fireEvent.click(pointZero);
    fireEvent.click(left);
    fireEvent.click(pointSix);
    fireEvent.click(right);
    fireEvent.click(pointThree);
  });

  it("should have three moves labeled after solving a piece", () => {
    const moves = screen.getByText(/Move count: 3/);
    expect(moves).toBeInTheDocument();
  });

  it("should remove the selected group after solving a piece", () => {
    const squares = screen.getByLabelText(/Selected group/)
      .children as HTMLCollectionOf<HTMLDivElement>;

    expect(squares.length).toBe(0);
  });

  it("should have the solved point background not red", () => {
    const point = screen.getByLabelText(/Point 3/);
    expect(point.style.backgroundColor).not.toBe("red");
  });

  it("should not increment the move counter on the solved point", () => {
    for (let i = 0; i < 10; i++)
      fireEvent.click(screen.getByLabelText(/Point 3/));

    const moves = screen.getByText(/Move count: 3/);
    expect(moves).toBeInTheDocument();
  });
});

describe("[Game] Solving a whole game", () => {
  beforeEach(() => {
    render(<Game />);

    const points = screen.getAllByLabelText(/Point \d+/);
    const left = screen.getByText(/Rotate left/);
    const right = screen.getByText(/Rotate right/);

    /* Solve green */
    fireEvent.click(points[0]);
    fireEvent.click(left);
    fireEvent.click(points[6]);
    fireEvent.click(right);
    fireEvent.click(points[3]);

    /* Solve blue */
    fireEvent.click(points[2]);
    fireEvent.click(right);
    fireEvent.click(points[8]);
    fireEvent.click(left);
    fireEvent.click(points[5]);

    /* Solve grey */
    fireEvent.click(points[0]);
    fireEvent.click(right);
    fireEvent.click(points[8]);
    fireEvent.click(right);
    fireEvent.click(points[2]);
    fireEvent.click(right);
    fireEvent.click(right);
    fireEvent.click(points[6]);
    fireEvent.click(right);
    fireEvent.click(right);
    fireEvent.click(points[4]);

    /* Solve yellow */
    fireEvent.click(points[0]);
    fireEvent.click(right);
    fireEvent.click(points[2]);
    fireEvent.click(right);
    fireEvent.click(points[6]);
    fireEvent.click(right);
    fireEvent.click(points[8]);
    fireEvent.click(right);
    fireEvent.click(points[4]);
  });

  it("should have the configuration screen", () => {
    const button = screen.getByLabelText(/Play the 4x4 configuration/);
    expect(button).toBeInTheDocument();
  });

  it("should reset the game to 4x4", () => {
    const button = screen.getByLabelText(/Play the 4x4 configuration/);
    fireEvent.click(button);

    expect(localStorage.getItem("config")).toBe("0");
  });

  it("should reset the game to 5x5", () => {
    const button = screen.getByLabelText(/Play the 5x5 configuration/);
    fireEvent.click(button);

    expect(localStorage.getItem("config")).toBe("1");
  });

  it("should reset the game to 6x6", () => {
    const button = screen.getByLabelText(/Play the 6x6 configuration/);
    fireEvent.click(button);

    expect(localStorage.getItem("config")).toBe("2");
  });
});
