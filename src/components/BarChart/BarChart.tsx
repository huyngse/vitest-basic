import type { BarChartProps } from "./types";
import styles from "./BarChart.module.css";

const BarChart = ({
  data = [],
  width = 400,
  height = 225,
  ticks = 5,
}: BarChartProps) => {
  const maxValue = Math.max(...data.map((d) => d.value));
  const tickValues = Array.from({ length: ticks + 1 }, (_, i) =>
    Math.round((maxValue / ticks) * i)
  );
  return (
    <div className={styles.container} data-testid="bar-chart">
      <div
        style={{ height }}
        className={styles.ticks}
        data-testid="bar-chart-ticks"
      >
        {tickValues.map((tick, index) => (
          <div
            key={index}
            className={styles.tick}
            data-testid={`tick-${index}`}
          >
            <span className={styles.tickLabel}>{tick}</span>
            <span className={styles.tickLine} />
          </div>
        ))}
      </div>
      <div
        style={{ width, height }}
        className={styles.chart}
        data-testid="bar-chart-area"
      >
        {data.map((d, index) => {
          const barHeight = (d.value / maxValue) * (height - 16);
          return (
            <div
              key={index}
              className={styles.barContainer}
              data-testid={`bar-container-${index}`}
            >
              <div
                style={{ height: barHeight }}
                className={styles.bar}
                data-testid={`bar-${index}`}
              >
                <div className={styles.barLabel}>{d.label}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BarChart;
