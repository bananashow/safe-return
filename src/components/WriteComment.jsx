import { styled } from "styled-components";
import { FaUserCircle } from "react-icons/fa";
import { SmallNavyButton } from "./buttonandInput/SmallNavyButton";
import { useUserInfo } from "../utils/useUserInfo";
import { collection, getFirestore, addDoc } from "firebase/firestore";
import { useState } from "react";
import { commentValidation } from "../utils/validation";
import { useRef } from "react";
import { increaseCommentCount } from "../utils/handleDataFromFirebase";

export const WriteComment = ({ docId }) => {
  const contentRef = useRef(null);
  const user = useUserInfo();
  const uid = localStorage.getItem("uid");
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    const isValid = commentValidation(comment, contentRef);
    if (!isValid) return;

    // 해당 posts의 commentCount를 +1처리
    // VI3...

    if (window.confirm("댓글을 등록할까요?")) {
      const db = getFirestore();
      increaseCommentCount(docId);

      await addDoc(collection(db, "comments"), {
        postDocId: docId,
        commenterUid: uid,
        content: comment,
        name: user.name,
        createdDate: new Date(),
        updateDate: null,
      });
      setComment("");
    } else {
      return;
    }
  };

  return (
    <WriteCommentContainer>
      <Header>
        <div className="userIcon">
          <FaUserCircle />
        </div>
        <div>
          <div className="name">{user.name}</div>
        </div>
      </Header>
      <div>
        <textarea
          ref={contentRef}
          placeholder="댓글을 입력하세요"
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        />
      </div>
      <div className="button-wrap" onClick={handleSubmit}>
        <SmallNavyButton>등록</SmallNavyButton>
      </div>
    </WriteCommentContainer>
  );
};

const WriteCommentContainer = styled.div`
  color: ${(props) => props.theme.color.navy};
  margin: 0 auto;
  margin-top: 16px;
  width: 80%;
  height: 180px;
  padding: 32px;
  border-radius: 16px;
  background-color: rgba(255, 255, 255, 0.8);

  textarea {
    width: 100%;
    height: 60px;
    padding: 4px 6px;
    border-radius: 4px;
  }

  .button-wrap {
    margin-bottom: 32px;
    button {
      float: right;
      padding: 4px 6px;
      margin: 4px 3px;
    }
  }
`;

const Header = styled.div`
  display: flex;
  gap: 6px;

  .userIcon {
    font-size: 24px;
  }
`;
