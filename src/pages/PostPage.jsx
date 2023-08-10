import { styled } from "styled-components";
import { BasicHeader } from "../components/BasicHeader";
import { PageMargin } from "../components/PageMargin";
import { useNavigate } from "react-router-dom";
import { TinyEditor } from "../components/TinyEditor";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { SignedInUserInfo } from "../recoil/Atoms";

export const PostPage = () => {
  const db = getFirestore();
  const navigation = useNavigate();
  const [content, setContent] = useState("");
  const userInfo = useRecoilValue(SignedInUserInfo);
  console.log(userInfo);

  const handleContent = (content) => {
    const newContent = `${content}`;
    setContent(newContent);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    //게시글을 firestore에 추가
    await addDoc(collection(db, "posts"), {
      name: userInfo.name,
      category: form.category.value,
      title: form.title.value,
      description: content,
      postedDate: new Date(),
      updateDate: null,
      viewCount: 0,
      likeCount: 0,
      commentCount: 0,
    });
  };
  return (
    <PageMargin>
      <BasicHeader>글쓰기</BasicHeader>
      <PostContainer>
        <form onSubmit={handleSubmit}>
          <div className="post-wrap">
            <input id="title" type="text" placeholder="제목을 입력하세요" />
            <select name="category">
              <option value="">카테고리</option>
              <option value="나누어요">나누어요</option>
              <option value="제보해요">제보해요</option>
            </select>
            <div className="textarea">
              <TinyEditor handleContent={handleContent} />
            </div>
            <div className="button-wrap">
              <button type="submit">등록</button>
              <button onClick={() => navigation(-1)}>취소</button>
              <button type="reset">다시쓰기</button>
            </div>
          </div>
        </form>
      </PostContainer>
    </PageMargin>
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

    button[type="submit"] {
      background-color: ${(props) => props.theme.color.navy};
      color: #fff;
    }
  }
`;
