import { useState } from "react";
import styles from "./Calculator.module.css";
import { Parser } from "expr-eval";

const Calculator = () => {
  const [equation, setEquation] = useState("");
  const [result, setResult] = useState("0");

  const handleButtonClick = (value: string) => {
    if (value === "C") {
      setEquation("");
      setResult("0");
    } else if (value === "CE") {
      setEquation("");
    } else if (value === "DEL") {
      setEquation((prev) => prev.slice(0, -1));
    } else if (value === "=") {
      try {
        const sanitized = equation.replace(/×/g, "*").replace(/÷/, "/");
        const parser = new Parser();
        const evalResult = parser.evaluate(sanitized || "0");
        setResult(evalResult.toString());
      } catch (err) {
        if (err instanceof Error) {
          setResult(err.message);
        } else {
          setResult("Error");
        }
      }
    } else if (value === "+/-") {
      if (equation.startsWith("-")) {
        setEquation(equation.slice(1));
      } else {
        setEquation("-" + equation);
      }
    } else {
      setEquation((prev) => prev + value);
    }
  };

  const buttons = [
    "CE",
    "C",
    "DEL",
    "÷",
    "7",
    "8",
    "9",
    "×",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    "+/-",
    "0",
    ".",
    "=",
  ];
  return (
    <div className={styles.calculator}>
      <p className={styles.equation} data-testid="equation">{equation || "0"}</p>
      <p className={styles.result} data-testid="result">Result: {result}</p>
      <div className={styles.buttonsContainer}>
        {buttons.map((btn) => (
          <button
            key={btn}
            data-testid={`button-${btn}`}
            className={btn === "=" ? styles.resultButton : ""}
            onClick={() => handleButtonClick(btn)}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
