import { useState } from "react";
import AppFirst from "./step-1/AppFirst";
import AppSecond from "./step-2/AppSecond";

const App = () => {
  const [no, setNo] = useState(0);

  const Content = (no) => {
    switch (no) {
      case 0:
        return <div>빈화면</div>;
      case 1:
        return <AppFirst />;
      case 2:
        return <AppSecond />;
      default:
        return <div>빈화면</div>;
    }
  };

  return (
    <div>
      <button
        onClick={() => {
          setNo(0);
        }}
      >
        Default
      </button>
      <button
        onClick={() => {
          setNo(1);
        }}
      >
        Step 1
      </button>
      <button
        onClick={() => {
          setNo(2);
        }}
      >
        Step 2
      </button>
      <button>Step 3</button>
      <button>Step 4</button>
      {Content(no)}
    </div>
  );
};

export default App;
