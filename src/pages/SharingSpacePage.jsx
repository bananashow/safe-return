import { styled } from "styled-components";
import { PageMargin } from "../components/styleElements/PageMargin";
import { BasicHeader } from "../components/styleElements/BasicHeader";
import { SearchSection } from "../components/postPage/SearchSection";
import { useNavigate } from "react-router-dom";
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from "recoil";
import {
  AllPostsSelector,
  CategoryPostSelector,
  SearchPostSelector,
} from "../recoil/DatabaseSelectors";
import { LikedPostDocIdsByUserSelector } from "../recoil/DatabaseSelectors";
import { increaseViews } from "../utils/handleDataFromFirebase";
import { useState } from "react";
import { useEffect } from "react";

export const convertSecondsToDate = (seconds) => {
  const date = new Date(seconds * 1000);
  return date.toLocaleString();
};

export const SharingSpacePage = () => {
  const navigation = useNavigate();
  const [searchWord, setSearchWord] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const searchWordPost = useRecoilValue(SearchPostSelector(searchWord));
  const categoryPost = useRecoilValue(CategoryPostSelector(selectedCategory));
  const likedPostArr = useRecoilValue(LikedPostDocIdsByUserSelector);
  const allPostsRefresh = useRecoilRefresher_UNSTABLE(AllPostsSelector);
  const likedPostArrRefresh = useRecoilRefresher_UNSTABLE(
    LikedPostDocIdsByUserSelector
  );

  useEffect(() => {
    likedPostArrRefresh();
    allPostsRefresh();
  }, [allPostsRefresh, likedPostArrRefresh]);

  const handleSearchWord = (word) => {
    setSearchWord(word);
  };

  const handleSelectedCategory = (category) => {
    setSelectedCategory(category);
  };

  const displayedPosts =
    selectedCategory === "" ? searchWordPost : categoryPost;

  const sortedPosts = displayedPosts?.slice().sort((a, b) => {
    const dateA = a.postedDate?.seconds || 0;
    const dateB = b.postedDate?.seconds || 0;
    return dateB - dateA;
  });

  const handlePostClick = async (post) => {
    increaseViews(post.id);

    navigation(`/sharing-space/${post.id}`, {
      state: {
        likedPostArr,
      },
    });
  };

  return (
    <>
      <PageMargin>
        <BasicHeader>나눔 공간</BasicHeader>
        <SharingSpaceContainer>
          <SearchSection
            handleSearchWord={handleSearchWord}
            handleSelectedCategory={handleSelectedCategory}
            selectedCategory={selectedCategory}
          />
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
                      {likedPostArr?.includes(post.id) ? (
                        <span className="red-heart">❤</span>
                      ) : (
                        <span>♡</span>
                      )}
                      {post.likeCount}
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
  font-family: "noto-sans";

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
    margin-top: 60px;
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
    font-family: "gmarket-light";
    font-weight: 900;
    background-color: ${(props) => props.theme.color.darkNavy};
    color: #fff;
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

  .red-heart {
    color: #f05858;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;
