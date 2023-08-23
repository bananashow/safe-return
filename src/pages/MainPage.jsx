import { styled } from "styled-components";
import mainImage from "../assets/main-backgd.jpg";
import { PageMargin } from "../components/styleElements/PageMargin";

export const MainPage = () => {
  return (
    <>
      <TeddyImage>
        <Notice>
          <p>
            꼭 필요한 곳에 우리의 눈과 마음을 모아주세요. <br />
            따뜻한 관심이 모여, 희망의 문을 엽니다.
          </p>
          <div>
            한 해에 성인 6만명에 대한 실종 신고가 접수됩니다.
            <br />
            신고된 성인 가운데 매년 1,000여명이 숨진 채 발견됩니다.
          </div>
        </Notice>
      </TeddyImage>
      <NewsContainer>
        <PageMargin>
          <div className="news-container"></div>
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
  padding: 36px 48px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #fff;
  font-family: "noto-sans";

  p {
    font-size: 38px;
    font-weight: 900;
    line-height: 70px;
  }

  div {
    margin-top: 24px;
    line-height: 32px;
    font-size: 18px;
  }
`;

const NewsContainer = styled.div`
  background-color: #2e2e2e;
  width: 100%;
  height: 100%;
  padding: 250px 0 10px 0;
  color: #fff;
`;
