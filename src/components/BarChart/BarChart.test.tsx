import { render, screen } from "@testing-library/react";
import BarChart from "./BarChart";

describe("BarChart Component", () => {
  const sampleData = [
    { label: "A", value: 10 },
    { label: "B", value: 20 },
    { label: "C", value: 30 },
  ];

  it("renders the main chart container", () => {
    render(<BarChart data={sampleData} />);
    expect(screen.getByTestId("bar-chart")).toBeInTheDocument();
    expect(screen.getByTestId("bar-chart-area")).toBeInTheDocument();
  });

  it("renders the correct number of bars", () => {
    render(<BarChart data={sampleData} />);
    const bars = sampleData.map((_, i) => screen.getByTestId(`bar-${i}`));
    expect(bars).toHaveLength(sampleData.length);
  });

  it("renders the correct number of tick marks", () => {
    const ticks = 4;
    render(<BarChart data={sampleData} ticks={ticks} />);
    const tickElements = Array.from({ length: ticks + 1 }, (_, i) =>
      screen.getByTestId(`tick-${i}`)
    );
    expect(tickElements).toHaveLength(ticks + 1);
  });

  it("sets proportional bar heights", () => {
    render(<BarChart data={sampleData} height={200} />);
    const bar0 = screen.getByTestId("bar-0") as HTMLElement;
    const bar1 = screen.getByTestId("bar-1") as HTMLElement;
    const bar2 = screen.getByTestId("bar-2") as HTMLElement;

    const h0 = parseFloat(bar0.style.height);
    const h1 = parseFloat(bar1.style.height);
    const h2 = parseFloat(bar2.style.height);

    expect(h0).toBeLessThan(h1);
    expect(h1).toBeLessThan(h2);
  });

  it("applies custom width and height props correctly", () => {
    const width = 500;
    const height = 300;
    render(<BarChart data={sampleData} width={width} height={height} />);
    const chartArea = screen.getByTestId("bar-chart-area");

    expect(chartArea).toHaveStyle(`width: ${width}px`);
    expect(chartArea).toHaveStyle(`height: ${height}px`);
  });

  it("handles empty data safely", () => {
    render(<BarChart data={[]} />);
    expect(screen.getByTestId("bar-chart")).toBeInTheDocument();
    expect(screen.queryAllByTestId(/^bar-\d+$/)).toHaveLength(0);
  });
});
