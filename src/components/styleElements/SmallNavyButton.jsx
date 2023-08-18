import { styled } from "styled-components";

export const SmallNavyButton = (props) => {
  return (
    <>
      <Button onClick={props.onClick}>{props.children}</Button>
    </>
  );
};

const Button = styled.button`
  border: none;
  border-radius: 4px;
  font-size: 11px;
  padding: 2px 4px;
  background-color: ${(props) => props.theme.color.navy};
  color: #fff;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.color.darkNavy};
  }
`;
