import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import QuadraticCalculator from "./QuadraticCalculator";

describe("QuadraticCalculator component", () => {
  const fillAndSubmit = async (a: number, b: number, c: number) => {
    render(<QuadraticCalculator />);

    const inputA = screen.getByTestId("input-a");
    const inputB = screen.getByTestId("input-b");
    const inputC = screen.getByTestId("input-c");
    const button = screen.getByTestId("calculate-button");

    fireEvent.change(inputA, { target: { value: a } });
    fireEvent.change(inputB, { target: { value: b } });
    fireEvent.change(inputC, { target: { value: c } });
    fireEvent.click(button);
  };

  it("shows two real roots when discriminant > 0", async () => {
    await fillAndSubmit(1, -3, 2);
    await waitFor(() => {
      expect(screen.getByTestId("result").textContent).toMatch(
        /Two real roots/i
      );
    });
  });

  it("shows one real root when discriminant = 0", async () => {
    await fillAndSubmit(1, 2, 1);
    await waitFor(() => {
      expect(screen.getByTestId("result").textContent).toMatch(
        /One real root/i
      );
    });
  });

  it("shows complex roots when discriminant < 0", async () => {
    await fillAndSubmit(1, 0, 1);
    await waitFor(() => {
      expect(screen.getByTestId("result").textContent).toMatch(
        /Complex roots/i
      );
    });
  });

  it("shows a message when a = 0", async () => {
    await fillAndSubmit(0, 2, 1);
    await waitFor(() => {
      expect(screen.getByTestId("result").textContent).toMatch(
        /Not a quadratic equation/i
      );
    });
  });
});
