import { MathJax, MathJaxContext } from "better-react-mathjax";
import { useForm } from "react-hook-form";
import styles from "./QuadraticCalculator.module.css";
import { useState } from "react";

type Inputs = {
  a: number;
  b: number;
  c: number;
};

const QuadraticCalculator = () => {
  const [result, setResult] = useState("");
  const { register, watch, handleSubmit } = useForm<Inputs>({
    defaultValues: { a: 1, b: 0, c: 0 },
  });

  const calculateRoots = (a: number, b: number, c: number) => {
    if (a === 0) return "Not a quadratic equation (a ≠ 0)";
    const discriminant = b * b - 4 * a * c;
    if (discriminant > 0) {
      const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
      const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
      return `Two real roots: x₁ = ${root1.toFixed(2)}, x₂ = ${root2.toFixed(
        2
      )}`;
    } else if (discriminant === 0) {
      const root = -b / (2 * a);
      return `One real root: x = ${root.toFixed(2)}`;
    } else {
      const realPart = (-b / (2 * a)).toFixed(2);
      const imagPart = (Math.sqrt(-discriminant) / (2 * a)).toFixed(2);
      return `Complex roots: x₁ = ${realPart} + ${imagPart}i, x₂ = ${realPart} - ${imagPart}i`;
    }
  };

  const onSubmit = (data: Inputs) => {
    const { a, b, c } = data;
    setResult(calculateRoots(a, b, c));
  };

  const a = watch("a");
  const b = watch("b");
  const c = watch("c");

  return (
    <div className={styles.container}>
      <MathJaxContext>
        <MathJax className={styles.equation}>{`\\(${a || "a"}x^2 + ${
          b || "b"
        }x + ${c || "c"} = 0\\)`}</MathJax>
      </MathJaxContext>
      <div>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>a:</label>
            <input
              type="number"
              step="any"
              {...register("a", { required: true, valueAsNumber: true })}
              data-testid="input-a"
            />
          </div>
          <div>
            <label>b:</label>
            <input
              type="number"
              step="any"
              {...register("b", { required: true, valueAsNumber: true })}
              data-testid="input-b"
            />
          </div>
          <div>
            <label>c:</label>
            <input
              type="number"
              step="any"
              {...register("c", { required: true, valueAsNumber: true })}
              data-testid="input-c"
            />
          </div>
          <button data-testid="calculate-button" type="submit">Calculate</button>
        </form>
      </div>

      <p data-testid="result">{result}</p>
    </div>
  );
};

export default QuadraticCalculator;
