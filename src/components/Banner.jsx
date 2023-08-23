import { styled } from "styled-components";

export const Banner = () => {
  return (
    <>
      <BannerWrap>
        <div>
          <div className="blue-text">실종아동찾기</div>
          <div className="connect">대표전화</div>
        </div>
        <div className="number">
          <div>1</div>
          <div>8</div>
          <div>2</div>
        </div>
      </BannerWrap>
    </>
  );
};

const BannerWrap = styled.div`
  width: 240px;
  height: 100px;
  padding: 12px 16px;
  font-weight: 900;
  background-color: #fff;
  border-radius: 4px;
  z-index: 999;
  user-select: none;

  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  right: 40px;
  bottom: 40px;

  .blue-text {
    color: #202077;
    margin-right: 5px;
  }

  .connect {
    float: right;
    margin-right: 5px;
  }

  .number {
    display: flex;

    & > div {
      width: 30px;
      height: 40px;
      background-color: #202077;
      margin: 3px;
      font-size: 32px;
      color: #fff;

      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;
