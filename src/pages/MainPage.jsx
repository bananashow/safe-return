import { styled } from "styled-components";
import mainImage from "../assets/main-backgd.jpg";

export const MainPage = () => {
  return (
    <>
      <TeddyImage>
        <Notice>
          <p>
            꼭 필요한 곳에 우리의 눈과 마음을 모아주세요. <br />
            따뜻한 관심이 모여, 희망의 문을 엽니다.
          </p>
        </Notice>
      </TeddyImage>
      <VideoContainer></VideoContainer>
    </>
  );
};

const TeddyImage = styled.div`
  width: 100%;
  height: 500px;
  background-image: url(${mainImage});
  background-size: cover;
  background-position: center;
  position: relative;
`;

const Notice = styled.div`
  width: 80%;
  height: 320px;
  background-color: rgba(17, 17, 17, 0.8);
  position: absolute;
  left: 50%;
  bottom: -160px;
  transform: translate(-50%, 0);

  display: flex;
  align-items: center;

  p {
    color: #fff;
    font-size: 38px;
    font-weight: 900;
    padding: 24px;
  }
`;

const VideoContainer = styled.div`
  background-color: #2e2e2e;
  width: 100%;
  height: 500px;
`;
