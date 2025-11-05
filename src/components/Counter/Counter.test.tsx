import { render, screen } from "@testing-library/react";
import Counter from "./Counter";
import userEvent from "@testing-library/user-event";

describe("Counter Component", () => {
  it("renders initials count as 0", () => {
    render(<Counter />);
    const count = screen.getByTestId("count");
    expect(count.textContent).toBe("0");
  });

  it("increment count when button is clicked", async () => {
    render(<Counter />);
    const button = screen.getByTestId("increase-button");
    const count = screen.getByTestId("count");

    await userEvent.click(button);
    expect(count.textContent).toBe("1");

    await userEvent.click(button);
    expect(count.textContent).toBe("2");
  });
});
