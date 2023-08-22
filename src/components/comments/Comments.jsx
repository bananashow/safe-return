import { styled } from "styled-components";
import { FaUserCircle } from "react-icons/fa";
import { SmallNavyButton } from "../styleElements/SmallNavyButton";
import {
  deleteComment,
  toggleCommentCount,
} from "../../utils/handleDataFromFirebase";
import { useState } from "react";
import { convertSecondsToDate } from "../../pages/SharingSpacePage";
import { EditComment } from "./EditComment";
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from "recoil";
import {
  CommentsSelector,
  GetCountsSelector,
} from "../../recoil/DatabaseSelectors";

export const Comments = ({ docId }) => {
  const signedInUid = localStorage.getItem("uid");
  const commentArr = useRecoilValue(CommentsSelector(docId));
  const commentsRefresh = useRecoilRefresher_UNSTABLE(CommentsSelector(docId));
  const countsRefresh = useRecoilRefresher_UNSTABLE(GetCountsSelector(docId));
  const [updateState, setUpdateState] = useState(false);
  const [editingCommentDocId, setEditingCommentDocId] = useState(null);

  const sortedComments = commentArr.slice().sort((a, b) => {
    const dateA = a.createdDate.seconds || 0;
    const dateB = b.createdDate.seconds || 0;
    return dateB - dateA;
  });

  const handleDelete = async (commentDocId) => {
    if (confirm("댓글을 삭제할까요?")) {
      await deleteComment(commentDocId);
      await toggleCommentCount(docId, -1);
      commentsRefresh();
      countsRefresh();
    } else {
      return;
    }
  };

  const handleUpdateState = (bool, docId) => {
    setUpdateState(bool);
    setEditingCommentDocId(docId);
    commentsRefresh();
  };

  return (
    <>
      {commentArr.length !== 0 ? (
        sortedComments.map((comment) => {
          return (
            <CommentContainer key={comment.createdDate.seconds}>
              <Header>
                <div className="userIcon">
                  <FaUserCircle />
                </div>
                <div>
                  <div className="name">{comment.name}</div>
                  {!updateState && (
                    <div className="date">
                      {convertSecondsToDate(comment.createdDate.seconds)}
                      {comment.updateDate && <span> 수정됨</span>}
                    </div>
                  )}
                </div>
              </Header>
              {updateState && editingCommentDocId === comment.docId ? (
                <EditComment
                  handleUpdateState={handleUpdateState}
                  comment={comment}
                />
              ) : (
                <div>
                  <div className="content">{comment.content}</div>
                  {signedInUid === comment.commenterUid && (
                    <div className="buttons">
                      <div onClick={() => handleDelete(comment.docId)}>
                        <SmallNavyButton>삭제</SmallNavyButton>
                      </div>
                      <div
                        onClick={() => handleUpdateState(true, comment.docId)}
                      >
                        <SmallNavyButton>수정</SmallNavyButton>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CommentContainer>
          );
        })
      ) : (
        <CommentContainer>댓글이 없습니다.</CommentContainer>
      )}
    </>
  );
};

const CommentContainer = styled.div`
  color: ${(props) => props.theme.color.navy};
  margin: 0 auto;
  margin-top: 16px;
  width: 80%;
  padding: 32px;
  border-radius: 16px;
  background-color: rgba(255, 255, 255, 0.8);

  .content {
    font-size: 14px;
    padding: 12px 0;
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

const Header = styled.div`
  display: flex;
  gap: 6px;

  .userIcon {
    font-size: 24px;
  }

  span {
    color: #008cff;
  }

  .date {
    font-size: 12px;
    color: ${(props) => props.theme.color.darkGray};
  }
`;
