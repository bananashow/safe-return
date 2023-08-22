import { styled } from "styled-components";

export const Badge = ({ number }) => {
  let category, color;

  if (number === "010") {
    category = "아동";
    color = "rgba(247, 213, 101, 0.8)";
  } else if (number === "020") {
    category = "가출";
    color = "rgba(236, 133, 133, 0.8)";
  } else if (number === "060" || number === "061" || number === "062") {
    category = "장애";
    color = "rgba(148, 248, 181, 0.8)";
  } else if (number === "070") {
    category = "치매";
    color = "rgba(192, 187, 255, 0.8)";
  }

  return (
    <>
      <BadgeWrap color={color}>{category}</BadgeWrap>
    </>
  );
};

const BadgeWrap = styled.div`
  width: 36px;
  height: 24px;
  font-family: "gmarket-light";
  font-size: 12px;
  font-weight: 600;
  background-color: ${(props) => props.color};
  border-bottom-right-radius: 8px;

  position: absolute;
  top: 0px;

  display: flex;
  align-items: center;
  justify-content: center;
`;
