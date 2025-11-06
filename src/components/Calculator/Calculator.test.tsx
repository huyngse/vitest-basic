import { fireEvent, render, screen } from "@testing-library/react";
import Calculator from "./Calculator";

describe("Calculator component", () => {
  it("renders initial states", () => {
    render(<Calculator />);
    expect(screen.getByTestId("equation")).toHaveTextContent("0");
    expect(screen.getByTestId("result")).toHaveTextContent("Result: 0");
  });

  it("appends numbers when clicked", () => {
    render(<Calculator />);
    fireEvent.click(screen.getByTestId("button-1"));
    fireEvent.click(screen.getByTestId("button-2"));
    fireEvent.click(screen.getByTestId("button-3"));
    expect(screen.getByTestId("equation")).toHaveTextContent("123");
  });

  it("clears equation and result with 'C'", () => {
    render(<Calculator />);
    fireEvent.click(screen.getByTestId("button-5"));
    fireEvent.click(screen.getByTestId("button-C"));
    expect(screen.getByTestId("equation")).toHaveTextContent("0");
    expect(screen.getByTestId("result")).toHaveTextContent("Result: 0");
  });

  it("clears only equation with 'CE'", () => {
    render(<Calculator />);
    fireEvent.click(screen.getByTestId("button-9"));
    fireEvent.click(screen.getByTestId("button-CE"));
    expect(screen.getByTestId("equation")).toHaveTextContent("0");
  });

  it("deletes last character with 'DEL'", () => {
    render(<Calculator />);
    fireEvent.click(screen.getByTestId("button-5"));
    fireEvent.click(screen.getByTestId("button-6"));
    fireEvent.click(screen.getByTestId("button-DEL"));
    expect(screen.getByTestId("equation")).toHaveTextContent("5");
  });

  it("evaluates a simple addition", () => {
    render(<Calculator />);
    fireEvent.click(screen.getByTestId("button-2"));
    fireEvent.click(screen.getByTestId("button-+"));
    fireEvent.click(screen.getByTestId("button-3"));
    fireEvent.click(screen.getByTestId("button-="));
    expect(screen.getByTestId("result")).toHaveTextContent("Result: 5");
  });

  it("handles multiply and divide correctly", () => {
    render(<Calculator />);
    fireEvent.click(screen.getByTestId("button-6"));
    fireEvent.click(screen.getByTestId("button-×"));
    fireEvent.click(screen.getByTestId("button-7"));
    fireEvent.click(screen.getByTestId("button-="));
    expect(screen.getByTestId("result")).toHaveTextContent("Result: 42");
  });

  it("toggles sign with '+/-'", () => {
    render(<Calculator />);
    fireEvent.click(screen.getByTestId("button-8"));
    fireEvent.click(screen.getByTestId("button-+/-"));
    expect(screen.getByTestId("equation")).toHaveTextContent("-8");
    fireEvent.click(screen.getByTestId("button-+/-"));
    expect(screen.getByTestId("equation")).toHaveTextContent("8");
  });

  it("handles invalid input safely", () => {
    render(<Calculator />);
    fireEvent.click(screen.getByTestId("button-÷"));
    fireEvent.click(screen.getByTestId("button-="));
    expect(screen.getByTestId("result")).toHaveTextContent(
      /Result: unexpected/i
    );
  });
});
