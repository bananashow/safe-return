import { styled } from "styled-components";
import spinner from "../assets/spinner.gif";

export const LoadingPage = () => {
  return (
    <Spinner>
      <img src={spinner} alt="로딩중" />
    </Spinner>
  );
};

const Spinner = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 25%;
  img {
    width: 100px;
  }
`;
