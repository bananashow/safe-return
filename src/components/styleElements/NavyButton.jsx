import { styled } from "styled-components";

export const NavyButton = (props) => {
  return <Button>{props.children}</Button>;
};

const Button = styled.button`
  margin: 0 4px;
  padding: 6px 16px;
  background-color: ${(props) => props.theme.color.navy};
  font-family: "gmarket-light";
  font-weight: 900;
  color: #fff;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  transition: all 0.4s;

  &:hover {
    background-color: ${(props) => props.theme.color.darkNavy};
  }
`;
