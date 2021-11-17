import { useDrop } from "react-dnd";
import { styled } from "@mui/material/styles";

const ITEM_TYPE = "WHATEVER";

const HomeWrapper = styled("div")(() => ({
  height: "300px",
  width: "500px",
  borderRadius: "10px",
  border: "3px solid black",
  backgroundColor: "#ffc",
}));

const Home = ({ children }) => {
  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    drop: () => ({ name: "Hannah" }),
  });

  return (
    <HomeWrapper ref={drop}>
      React DnD 연습 중임
      {children}
    </HomeWrapper>
  );
};

export default Home;
