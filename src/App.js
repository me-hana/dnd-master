import { useState } from "react";
import AppFirst from "./step-1/AppFirst";
import AppSecond from "./step-2/AppSecond";
import AppThird from "./step-3/AppThird";
import AppFourth from "./step-4/AppFourth";
import TestPage from "./TestPage";

const App = () => {
  const [no, setNo] = useState(0);

  const Content = (no) => {
    switch (no) {
      case 0:
        return <TestPage />;
      case 1:
        return <AppFirst />;
      case 2:
        return <AppSecond />;
      case 3:
        return <AppThird />;
      case 4:
        return <AppFourth />;
      default:
        return <div>잘못된 접근</div>;
    }
  };

  return (
    <div>
      <button
        onClick={() => {
          setNo(0);
        }}
      >
        Test
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
      <button
        onClick={() => {
          setNo(3);
        }}
      >
        Step 3
      </button>
      <button
        onClick={() => {
          setNo(4);
        }}
      >
        Step 4
      </button>
      {Content(no)}
    </div>
  );
};

export default App;
