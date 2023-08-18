import { styled } from "styled-components";

export const BasicHeader = (props) => {
  return (
    <PageTitle>
      <h2>{props.children}</h2>
    </PageTitle>
  );
};

const PageTitle = styled.div`
  margin: 0 auto;
  text-align: center;

  h2 {
    padding: 32px 0;
  }
`;
