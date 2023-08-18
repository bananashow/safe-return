import { useState } from "react";
import { styled } from "styled-components";
import { SmallNavyButton } from "../styleElements/SmallNavyButton";
import { updateComment } from "../../utils/handleDataFromFirebase";
import { useRef } from "react";
import { commentValidation } from "../../utils/validation";

export const EditComment = ({ comment, handleUpdateState }) => {
  const contentRef = useRef(null);
  const [commentContent, setCommentContent] = useState(comment.content);

  console.log(comment);

  const handleUpdate = () => {
    const isValid = commentValidation(commentContent, contentRef);
    if (!isValid) return;

    const newPost = {
      content: commentContent,
    };
    updateComment(comment.docId, newPost);
    handleUpdateState(false);
  };

  return (
    <>
      <EditCommentContainer>
        <textarea
          ref={contentRef}
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
        />
        <div className="buttons">
          <div onClick={() => handleUpdateState(false)}>
            <SmallNavyButton>취소</SmallNavyButton>
          </div>
          <div onClick={handleUpdate}>
            <SmallNavyButton>수정</SmallNavyButton>
          </div>
        </div>
      </EditCommentContainer>
    </>
  );
};

const EditCommentContainer = styled.div`
  textarea {
    width: 100%;
    height: 60px;
    padding: 4px 6px;
    border-radius: 4px;
  }

  .buttons {
    margin-bottom: 32px;
    button {
      float: right;
      padding: 4px 6px;
      margin: 4px 3px;
    }
  }
`;
