import { styled } from "styled-components";
import { PageMargin } from "../components/PageMargin";
import { useNavigate, useParams } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { BasicHeader } from "../components/BasicHeader";
import { SmallNavyButton } from "../components/buttonandInput/SmallNavyButton";
import {
  deletePost,
  getPostInfo,
  toggleLikes,
} from "../utils/handleDataFromFirebase";
import { useState } from "react";
import { useEffect } from "react";
import { convertSecondsToDate } from "./SharingSpacePage";
import { Comments } from "../components/Comments";
import { WriteComment } from "../components/WriteComment";

export const PostViewPage = () => {
  const navigation = useNavigate();
  const signedInUid = localStorage.getItem("uid");
  const { docId } = useParams();
  const [postInfo, setPostInfo] = useState({});
  const [likeState, setLikeState] = useState({
    state: false,
    likes: 0,
  });

  useEffect(() => {
    (async () => {
      const result = await getPostInfo(docId);
      setPostInfo(result);
      setLikeState((prev) => ({
        ...prev,
        likes: result.likeCount,
      }));
    })();
  }, [docId]);

  const handleLikeCount = () => {
    setLikeState((prev) => ({
      state: !prev.state,
      likes: prev.state ? prev.likes - 1 : prev.likes + 1,
    }));

    if (!likeState.state) {
      toggleLikes(docId, 1);
    } else {
      toggleLikes(docId, -1);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    navigation(`/sharing-space/${docId}/edit`, {
      state: {
        postInfo,
      },
    });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    if (window.confirm("정말 삭제할까요?")) {
      deletePost(docId);
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
                    <span>👀</span> {postInfo.viewCount}
                  </div>
                  <div>
                    <span>💬</span> {postInfo.commentCount}
                  </div>
                  <div className="likes" onClick={handleLikeCount}>
                    {likeState.state ? (
                      <span className="red-heart">❤</span>
                    ) : (
                      <span>❤</span>
                    )}
                    {likeState.likes}
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
  }

  .description-wrap {
    width: 100%;
    height: fit-content;
    margin: 30px 0;
    padding: 30px 0;
    border-radius: 12px;
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
