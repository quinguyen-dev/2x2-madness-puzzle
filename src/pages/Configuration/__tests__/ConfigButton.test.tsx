import { BrowserRouter } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import ConfigButton from "../ConfigButton";

describe("[ConfigButton] Rendering", () => {
  it("should render correctly", () => {
    const component = render(<ConfigButton config={0}>Button</ConfigButton>, {
      wrapper: BrowserRouter,
    });
    expect(component).toMatchSnapshot();
  });
});

describe("[ConfigButton] Events", () => {
  it("should update local storage with config", () => {
    render(<ConfigButton config={5}>Button</ConfigButton>, {
      wrapper: BrowserRouter,
    });

    expect(localStorage.getItem("config")).toBeNull();

    const button = screen.getByText(/Button/);
    fireEvent.click(button);

    expect(localStorage.getItem("config")).toBe("5");
  });
});
