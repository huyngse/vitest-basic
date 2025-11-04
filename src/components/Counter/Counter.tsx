import { useState } from "react";
import styles from "./Counter.module.css";
const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div className={styles.counterContainer}>
      <p data-testid="count">{count}</p>
      <button onClick={() => setCount((prev) => prev + 1)} data-testid="increase-button">Increase</button>
    </div>
  );
};

export default Counter;
