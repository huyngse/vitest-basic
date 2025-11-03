import styles from "./Greeting.module.css";
import type { GreetingProps } from "./types";

const Greeting = ({ name }: GreetingProps) => {
  return <h1 className={styles.h1}>Hello, {name || "World"}!</h1>;
};

export default Greeting;
