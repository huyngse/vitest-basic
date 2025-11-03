import Counter from "./components/Counter/Counter";
import Greeting from "./components/Greeting/Greeting";
import UserProfile from "./components/UserProfile/UserProfile";

function App() {
  return (
    <>
      <Greeting />
      <Counter />
      <UserProfile id={1} />
    </>
  );
}

export default App;
