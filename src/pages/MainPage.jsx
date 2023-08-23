import { styled } from "styled-components";
import mainImage from "../assets/main-backgd.jpg";
import { BasicHeader } from "../components/styleElements/BasicHeader";
import { PageMargin } from "../components/styleElements/PageMargin";
import { Carousel } from "../components/Carousel";

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
      <NewsContainer>
        <PageMargin>
          <div className="news-container">
            <BasicHeader>실시간 실종 관련 뉴스</BasicHeader>
            <Carousel />
          </div>
        </PageMargin>
      </NewsContainer>
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
    font-family: "noto-sans";
    line-height: 70px;
  }
`;

const NewsContainer = styled.div`
  background-color: #2e2e2e;
  width: 100%;
  height: 100%;
  padding: 250px 0 100px 0;
  color: #fff;
`;
