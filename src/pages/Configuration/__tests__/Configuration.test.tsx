import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import Configuration from "../Configuration";

describe("[Configuration] Rendering", () => {
  it("should render correctly", () => {
    const component = render(<Configuration />, { wrapper: BrowserRouter });
    expect(component).toMatchSnapshot();
  });
});
