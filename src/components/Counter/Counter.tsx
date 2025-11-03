import { useState } from "react";
import styles from "./Counter.module.css";
const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div className={styles.counterContainer}>
      <p>{count}</p>
      <button onClick={() => setCount((prev) => prev + 1)}>Increase</button>
    </div>
  );
};

export default Counter;
