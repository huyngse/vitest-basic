import BarChart from "./components/BarChart/BarChart";

const data = [
  { label: "Apples", value: 10 },
  { label: "Oranges", value: 15 },
  { label: "Bananas", value: 27 },
];

function App() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh"
      }}
    >
      <BarChart data={data} width={800} height={600} />
    </div>
  );
}

export default App;
