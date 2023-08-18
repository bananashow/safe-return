import { styled } from "styled-components";

export const SignUpInButton = (props) => {
  return (
    <>
      <SignUpInButtonBox
        $backgdColor={props.backgdColor}
        $hoverBackgdColor={props.hoverBackgdColor}
        $fontColor={props.fontColor}
        onClick={props.onClick}
      >
        <button>{props.children}</button>
      </SignUpInButtonBox>
    </>
  );
};

const SignUpInButtonBox = styled.div`
  display: flex;
  flex-direction: column;

  button {
    background-color: ${(props) =>
      props.$backgdColor ? props.$backgdColor : props.theme.color.navy};
    margin: 6px auto;
    width: 300px;
    height: 40px;
    padding: 0 12px;
    border: none;
    border-radius: 4px;
    color: ${(props) => (props.$fontColor ? props.$fontColor : "#fff")};
    cursor: pointer;
    transition: all 0.4s;

    &:hover {
      background-color: ${(props) =>
        props.$backgdColor
          ? props.$hoverBackgdColor
          : props.theme.color.darkNavy};
    }
  }
`;
