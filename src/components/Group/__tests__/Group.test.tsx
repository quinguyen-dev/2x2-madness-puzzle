import { expect, describe, it } from "vitest";
import { render } from "@testing-library/react";
import Group from "../Group";

describe("[Group Component] Rendering", () => {
  it("should render no children", () => {
    const component = render(<Group group={[]} />);
    expect(component).toMatchSnapshot();
  });
});
