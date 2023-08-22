import { styled } from "styled-components";
import { PageMargin } from "../components/styleElements/PageMargin";
import { useNavigate, useParams } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { BasicHeader } from "../components/styleElements/BasicHeader";
import { SmallNavyButton } from "../components/styleElements/SmallNavyButton";
import {
  deletePost,
  pushLikedUserUid,
  removeLikedUserUid,
  toggleLikes,
} from "../utils/handleDataFromFirebase";
import { convertSecondsToDate } from "./SharingSpacePage";
import { Comments } from "../components/comments/Comments";
import { WriteComment } from "../components/comments/WriteComment";
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from "recoil";
import {
  AllPostsSelector,
  GetCountsSelector,
  LikedPostDocIdsByUserSelector,
  PostInfoSelector,
} from "../recoil/DatabaseSelectors";
import { useEffect } from "react";
import { useState } from "react";

export const PostViewPage = () => {
  const navigation = useNavigate();
  const signedInUid = localStorage.getItem("uid");
  const { docId } = useParams();
  const postInfo = useRecoilValue(PostInfoSelector(docId));
  const likedPostDocIdsArr = useRecoilValue(LikedPostDocIdsByUserSelector);
  const allDataRefresh = useRecoilRefresher_UNSTABLE(AllPostsSelector);
  const countsRefresh = useRecoilRefresher_UNSTABLE(GetCountsSelector(docId));
  const getCounts = useRecoilValue(GetCountsSelector(docId));

  const [isLiked, setIsLiked] = useState(likedPostDocIdsArr.includes(docId));

  useEffect(() => {
    allDataRefresh();
    setIsLiked(likedPostDocIdsArr.includes(docId));
  }, [allDataRefresh, likedPostDocIdsArr, docId]);

  useEffect(() => {
    countsRefresh();
  }, [countsRefresh]);

  const handleLikeCount = async () => {
    if (isLiked) {
      await toggleLikes(docId, -1);
      await removeLikedUserUid(docId, signedInUid);
      countsRefresh();
    } else {
      await toggleLikes(docId, 1);
      await pushLikedUserUid(docId, signedInUid);
      countsRefresh();
    }

    setIsLiked(!isLiked);
    countsRefresh();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    allDataRefresh();
    navigation(`/sharing-space/${docId}/edit`, {
      state: {
        postInfo,
      },
    });
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (window.confirm("정말 삭제할까요?")) {
      deletePost(docId);
      allDataRefresh();
      navigation("/sharing-space");
    } else {
      return;
    }
  };

  return (
    <PageMargin>
      <BasicHeader>게시글 보기</BasicHeader>
      <PostContainer>
        <form>
          <div className="post-wrap">
            <div className="category">{postInfo.category}</div>
            <hr />
            <h2>{postInfo.title}</h2>
            <Header>
              <div className="userIcon">
                <FaUserCircle />
              </div>
              <div>
                <div className="name">{postInfo.name}</div>
                <div className="date">
                  {postInfo.postedDate &&
                    convertSecondsToDate(postInfo.postedDate.seconds)}
                  {postInfo.updateDate && <span> 수정됨</span>}
                </div>
              </div>
            </Header>
            <div className="description-wrap">
              <div
                className="description"
                dangerouslySetInnerHTML={{ __html: postInfo.description }}
              ></div>
            </div>
            <Footer>
              <div
                className={
                  signedInUid === postInfo.uid ? "my-post" : "not-my-post"
                }
              >
                {signedInUid === postInfo.uid && (
                  <div className="buttons">
                    <SmallNavyButton onClick={handleUpdate}>
                      수정
                    </SmallNavyButton>
                    <SmallNavyButton onClick={handleDelete}>
                      삭제
                    </SmallNavyButton>
                  </div>
                )}
                <div className="counts">
                  <div>
                    <span>👀</span> {getCounts.viewCount}
                  </div>
                  <div>
                    <span>💬</span> {getCounts.commentCount}
                  </div>
                  <div className="likes" onClick={handleLikeCount}>
                    {isLiked ? (
                      <span className="red-heart">❤️</span>
                    ) : (
                      <span>♡</span>
                    )}
                    {getCounts.likeCount}
                  </div>
                </div>
              </div>
            </Footer>
          </div>
        </form>
      </PostContainer>
      <WriteComment docId={docId} />
      <Comments docId={docId} />
    </PageMargin>
  );
};

const PostContainer = styled.div`
  color: ${(props) => props.theme.color.navy};

  .post-wrap {
    margin: 0 auto;
    width: 80%;
    padding: 32px;
    border-radius: 16px;
    background-color: rgba(255, 255, 255, 0.8);
  }

  h2 {
    margin: 24px 0;
    font-size: 32px;
    font-family: "noto-sans";
  }

  .description-wrap {
    width: 100%;
    height: fit-content;
    margin: 30px 0;
    padding: 30px 0;
    border-radius: 12px;
    font-family: "noto-sans";
  }

  hr {
    border: 1px solid rgba(169, 204, 204, 0.3);
  }

  .category {
    color: ${(props) => props.theme.color.dark};
  }
`;

const Header = styled.div`
  display: flex;
  gap: 12px;

  span {
    color: #008cff;
  }

  .date {
    font-size: 12px;
    color: ${(props) => props.theme.color.darkGray};
  }

  .userIcon {
    font-size: 38px;
  }
`;

const Footer = styled.div`
  .my-post {
    display: flex;
    justify-content: space-between;
  }

  .not-my-post {
    display: flex;
    justify-content: flex-end;
  }

  .counts {
    display: flex;
    gap: 12px;
    user-select: none;
  }

  .buttons {
    button {
      padding: 4px 6px;
      margin-right: 6px;
    }
  }

  .red-heart {
    color: #f05858;
  }

  .likes > span {
    cursor: pointer;
  }
`;
