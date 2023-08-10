import { styled } from "styled-components";
import { PageMargin } from "../components/PageMargin";
import { BasicHeader } from "../components/BasicHeader";
import { useNavigate } from "react-router-dom";

export const SharingSpacePage = () => {
  const navigation = useNavigate();
  return (
    <>
      <PageMargin>
        <BasicHeader>나눔 공간</BasicHeader>
        <SharingSpaceContainer>
          <SearchSection>
            <input type="text" placeholder="검색어를 입력하세요" />
            <div>
              <select>
                <option>전체</option>
                <option>나누어요</option>
                <option>제보해요</option>
              </select>
              <button>내가 쓴 글</button>
              <button
                className="post-button"
                onClick={() => navigation("/post")}
              >
                글쓰기
              </button>
            </div>
          </SearchSection>

          <div className="posts">
            <div className="item">
              <div>
                <div className="title">뉴스 공유 드려요</div>
                <div className="category">| 나누어요</div>
                <div className="writer">정지혜</div>
                <div className="content">
                  아동 실종 만큼이나 성인 실종 문제도 심각해 작년 한해동안 아동
                  및 취약 계층의 실종이 크게...
                </div>
              </div>
              <Footer>
                <div className="write-date">2022-12-24 13:16</div>
                <div className="interest">
                  <span>👀 15</span>
                  <span>💬 12</span>
                  <span>❤ 3</span>
                </div>
              </Footer>
            </div>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
          </div>
        </SharingSpaceContainer>
      </PageMargin>
    </>
  );
};

const SharingSpaceContainer = styled.div`
  input {
    width: 500px;
    height: 50px;
    padding: 4px 12px;
    border-radius: 12px;
    border: none;

    &::placeholder {
      color: ${(props) => props.theme.color.darkGray};
    }
  }

  .posts {
    margin-top: 80px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;

    .item {
      width: 100%;
      height: 250px;
      background-color: ${(props) => props.theme.color.navy};
      border-radius: 12px;
      padding: 24px;
      text-align: left;
      color: white;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .title {
        padding: 2px 0;
        font-size: 22px;
        font-weight: 900;
      }

      .category {
        font-size: 12px;
      }

      .writer {
        font-size: 16px;
        font-weight: 700;
        margin: 12px 0;
      }

      .content {
        font-size: 14px;
      }
    }
  }

  .post-button {
    background-color: ${(props) => props.theme.color.darkNavy};
    color: #fff;
  }
`;

const SearchSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  select,
  button {
    height: 40px;
    border: none;
    border-radius: 12px;
    padding: 4px 8px;
    margin: 16px 8px;
    background-color: #fff;
    width: 124px;
    text-align: center;
    cursor: pointer;
  }
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .write-date,
  .interest {
    font-size: 14px;
  }

  span {
    padding: 0 6px;
  }
`;
