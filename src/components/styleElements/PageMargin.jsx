import { styled } from "styled-components";

export const PageMargin = (props) => {
  return (
    <>
      <Container>{props.children}</Container>
    </>
  );
};

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  margin-bottom: 100px;
`;
