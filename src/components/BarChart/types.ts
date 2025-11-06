export type ChartData = {
    label: string;
    value: number;
};

export interface BarChartProps {
    data: ChartData[];
    width?: number;
    height?: number;
    ticks?: number;
}
