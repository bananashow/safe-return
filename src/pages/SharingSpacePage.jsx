import { styled } from "styled-components";
import { PageMargin } from "../components/PageMargin";
import { BasicHeader } from "../components/BasicHeader";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { AllPostsSelector } from "../recoil/DatabaseSelectors";
import { increaseViews } from "../utils/handleDataFromFirebase";

export const convertSecondsToDate = (seconds) => {
  const date = new Date(seconds * 1000);
  return date.toLocaleString();
};

export const SharingSpacePage = () => {
  const navigation = useNavigate();
  const AllPosts = useRecoilValue(AllPostsSelector);

  const sortedPosts = AllPosts?.slice().sort((a, b) => {
    const dateA = a.postedDate?.seconds || 0;
    const dateB = b.postedDate?.seconds || 0;
    return dateB - dateA;
  });

  const handlePostClick = (post) => {
    increaseViews(post.id);
    navigation(`/sharing-space/${post.id}`, {});
  };

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
            {sortedPosts.map((post) => {
              const createDate = convertSecondsToDate(post.postedDate?.seconds);
              return (
                <div
                  className="item"
                  key={post.id}
                  onClick={() => handlePostClick(post)}
                >
                  <Header>
                    <div>
                      <div className="category">| {post.category}</div>
                      <div className="title">{post.title}</div>
                    </div>
                    <div className="writer">{post.name}</div>
                  </Header>
                  <Footer>
                    <div className="counts">
                      <span>👀 {post.viewCount}</span>
                      <span>💬 {post.commentCount}</span>
                      <span>❤ {post.likeCount}</span>
                    </div>
                    <div className="write-date">{createDate}</div>
                  </Footer>
                </div>
              );
            })}
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
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 16px;

    .item {
      width: 80%;
      height: 150px;
      background-color: ${(props) => props.theme.color.navy};
      border-radius: 12px;
      padding: 24px;
      text-align: left;
      color: white;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-shadow: 0px 4px 12px rgba(14, 13, 13, 0.8);
      cursor: pointer;

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
  .counts {
    font-size: 14px;
  }

  span {
    padding: 0 6px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;
