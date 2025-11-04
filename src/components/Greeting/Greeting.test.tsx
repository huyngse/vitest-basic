import { render, screen } from "@testing-library/react";
import Greeting from "./Greeting";
import "@testing-library/jest-dom";

describe("Greeting Component", () => {
  it("renders default 'World' when no name is provided", () => {
    render(<Greeting />);
    const heading = screen.getByRole("heading", { name: /Hello, World!/i });
    expect(heading).toBeDefined();
  });

  it("renders with a name", () => {
    render(<Greeting name="John" />);
    const heading = screen.getByRole("heading", { name: /Hello, John!/i });
    expect(heading).toBeDefined();
  });
});
