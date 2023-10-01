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
});

describe("[Game] Events", () => {
  it("should have the background as red for a clicked point", () => {
    render(<Game />);

    const points = screen.getAllByLabelText(/Point \d+/);
    expect(points.length).toBe(9);

    fireEvent.click(points[0]);
    expect(points[0].style.backgroundColor).toBe("red");
  });

  it("should have the background as red for a clicked point", () => {
    render(<Game />);

    const pointZero = screen.getByLabelText(/Point 0/);
    const pointThree = screen.getByLabelText(/Point 3/);
    const pointSix = screen.getByLabelText(/Point 6/);
    const rotateRight = screen.getByText(/Rotate right/);
    const rotateLeft = screen.getByText(/Rotate left/);

    fireEvent.click(pointZero);
    fireEvent.click(rotateLeft);
    fireEvent.click(pointSix);
    fireEvent.click(rotateRight);
    fireEvent.click(pointThree);

    const moves = screen.getByText(/Move count: 3/);
    expect(moves).toBeInTheDocument();
  });

  it("should reset the board when the reset button is clicked", () => {
    const component = render(<Game />);

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
});
