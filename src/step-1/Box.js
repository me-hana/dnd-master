import { useDrop } from "react-dnd";
import { styled } from "@mui/material/styles";

const ITEM_TYPE = "card";

const BoxWrapper = styled("div")(() => ({
  height: "300px",
  width: "500px",
  borderRadius: "10px",
  border: "2px solid black",
  margin: "10px",
  backgroundColor: "#ac1",
}));

const TitleWrapper = styled("div")(() => ({
  fontSize: "2rem",
  margin: 10,
  letterSpacing: "-0.1rem",
  fontFamily: "fantasy",
}));

const Box = ({ children, title }) => {
  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    drop: () => ({ name: title }),
  });

  return (
    <BoxWrapper ref={drop}>
      <TitleWrapper>{title}</TitleWrapper>
      <div style={{ margin: 10 }}>{children}</div>
    </BoxWrapper>
  );
};

export default Box;
