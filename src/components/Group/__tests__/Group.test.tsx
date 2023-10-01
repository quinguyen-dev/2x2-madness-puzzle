import { expect, describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Group from "../Group";
import { Square } from "../../../model/Model";

describe("[Group Component] Rendering", () => {
  it("should render no children", () => {
    const component = render(<Group group={[]} />);
    expect(component).toMatchSnapshot();
  });

  it("should render a quadrant that is all white", () => {
    /* Filling the array with the same reference. */
    const data = new Array(4).fill(new Square(0, 0, "undefined"));

    render(<Group group={data} />);

    const group = screen.getByLabelText(/Selected group/);
    for (let element of group.children) {
      const e = element as HTMLElement;
      expect(e.style.backgroundColor).toBe("white");
    }
  });

  it("should render a quadrant that is all red", () => {
    /* Filling the array with the same reference. */
    const data = new Array(4).fill(new Square(0, 0, "red"));

    render(<Group group={data} />);

    const group = screen.getByLabelText(/Selected group/);
    for (let element of group.children) {
      const e = element as HTMLElement;
      expect(e.style.backgroundColor).toBe("red");
    }
  });
});
