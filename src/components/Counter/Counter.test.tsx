import { fireEvent, render, screen } from "@testing-library/react";
import Counter from "./Counter";

describe("Counter Component", () => {
  it("renders initials count as 0", () => {
    render(<Counter />);
    const count = screen.getByTestId("count");
    expect(count.textContent).toBe("0");
  });

  it("increment count when button is clicked", () => {
    render(<Counter />);
    const button = screen.getByTestId("increase-button");
    const count = screen.getByTestId("count")

    fireEvent.click(button);
    expect(count.textContent).toBe("1");

    fireEvent.click(button);
    expect(count.textContent).toBe("2");
  });
});
