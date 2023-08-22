import { styled } from "styled-components";
import { BasicHeader } from "../components/styleElements/BasicHeader";
import { PageMargin } from "../components/styleElements/PageMargin";
import { TinyEditor } from "../components/TinyEditor";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { updatePost } from "../utils/handleDataFromFirebase";
import { postValidation } from "../utils/validation";
import { useRef } from "react";
import { useRecoilRefresher_UNSTABLE } from "recoil";
import { PostInfoSelector } from "../recoil/DatabaseSelectors";

export const PostEditPage = () => {
  const navigation = useNavigate();
  const location = useLocation();
  const { docId } = useParams();
  const postInfo = location.state.postInfo;
  const titleRef = useRef(null);
  const categoryRef = useRef(null);
  const refresh = useRecoilRefresher_UNSTABLE(PostInfoSelector(docId));

  const [newPost, setNewPost] = useState({
    title: postInfo.title,
    category: postInfo.category,
    description: postInfo.description,
  });

  const handleContent = (content) => {
    setNewPost((prev) => ({ ...prev, description: content }));
  };

  const handleEdit = () => {
    const isValid = postValidation(
      newPost.title,
      newPost.category,
      titleRef,
      categoryRef
    );
    if (!isValid) return;

    updatePost(docId, newPost);
    refresh();
    navigation(`/sharing-space/${docId}`);
  };

  return (
    <>
      <PageMargin>
        <BasicHeader>글 수정</BasicHeader>
        <PostContainer>
          <div className="post-wrap">
            <input
              id="title"
              type="text"
              placeholder="제목을 입력하세요"
              value={newPost.title}
              onChange={(e) =>
                setNewPost((prev) => ({ ...prev, title: e.target.value }))
              }
              ref={titleRef}
            />
            <select
              name="category"
              value={newPost.category}
              onChange={(e) =>
                setNewPost((prev) => ({ ...prev, category: e.target.value }))
              }
              ref={categoryRef}
            >
              <option value="">카테고리</option>
              <option value="나누어요">나누어요</option>
              <option value="제보해요">제보해요</option>
            </select>
            <div className="textarea">
              <TinyEditor
                value={newPost.description}
                handleContent={handleContent}
              />
            </div>
            <div className="button-wrap">
              <button className="edit" onClick={handleEdit}>
                수정
              </button>
              <button onClick={() => navigation(-1)}>취소</button>
            </div>
          </div>
        </PostContainer>
      </PageMargin>
    </>
  );
};

const PostContainer = styled.div`
  .post-wrap {
    display: grid;
    grid-template-columns: 3fr 1fr;
    grid-template-areas:
      "title select"
      "textarea textarea"
      "buttons buttons";

    margin: 0 auto;
    width: 80%;
    height: 500px;
    padding: 32px;
    border-radius: 16px;
    background-color: ${(props) => props.theme.color.dark};

    input,
    select {
      border: 1px solid #c0c0c0;
      border-radius: 8px;
      padding: 12px;
      margin: 8px;
    }

    input {
      grid-area: title;
    }

    .textarea {
      grid-area: textarea;
      padding: 8px;
    }

    select {
      grid-area: select;
    }
  }

  .button-wrap {
    grid-area: buttons;
    display: flex;
    justify-content: center;
    gap: 10px;

    button {
      border: none;
      border-radius: 8px;
      width: 80px;
      height: 30px;
      padding: 4px 8px;
      margin: 8px 0;
      cursor: pointer;
    }

    .edit {
      background-color: ${(props) => props.theme.color.navy};
      color: #fff;
    }
  }
`;
