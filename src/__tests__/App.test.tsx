import { expect, describe, it } from "vitest";
import { render } from "@testing-library/react";
import App from "../App";

describe("[App Component] Rendering", () => {
  it("should render no children", () => {
    const component = render(<App />);
    expect(component).toMatchSnapshot();
  });
});
