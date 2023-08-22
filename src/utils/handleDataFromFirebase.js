import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  increment,
  deleteDoc,
} from "firebase/firestore";

// --------------------- 게시판 ---------------------

// docId와 일치하는 게시글 삭제하기
export const deletePost = async (docId) => {
  const db = getFirestore();
  await deleteDoc(doc(db, "posts", docId));
};

// docId와 일치하는 게시글 수정하기
export const updatePost = async (docId, newPost) => {
  const db = getFirestore();
  const docRef = doc(db, "posts", docId);
  await updateDoc(docRef, {
    title: newPost.title,
    category: newPost.category,
    description: newPost.description,
    updateDate: new Date(),
  });
};

// docId와 일치하는 게시글 조회수+1
export const increaseViews = async (docId) => {
  const db = getFirestore();
  const docRef = doc(db, "posts", docId);
  await updateDoc(docRef, {
    viewCount: increment(1),
  });
  return;
};

// docId와 일치하는 게시글 좋아요 토글
export const toggleLikes = async (docId, number) => {
  const db = getFirestore();
  const docRef = doc(db, "posts", docId);
  await updateDoc(docRef, {
    likeCount: increment(number),
  });
  return;
};

// 좋아요 누르면 해당 게시글 likedUserUids 배열에 uid 넣기&빼기
export const pushLikedUserUid = async (docId, uid) => {
  const db = getFirestore();
  const docRef = doc(db, "posts", docId);

  const docSnapshot = await getDoc(docRef);
  if (docSnapshot.exists()) {
    const postData = docSnapshot.data();
    const updatedLikedUserUids = [...postData.likedUserUids, uid];
    await updateDoc(docRef, {
      likedUserUids: updatedLikedUserUids,
    });
  } else {
    console.log("Document not found");
  }
};

export const removeLikedUserUid = async (docId, uid) => {
  const db = getFirestore();
  const docRef = doc(db, "posts", docId);

  const docSnapshot = await getDoc(docRef);
  if (docSnapshot.exists()) {
    const postData = docSnapshot.data();
    const updatedLikedUserUids = postData.likedUserUids.filter(
      (existingUid) => existingUid !== uid
    );
    await updateDoc(docRef, {
      likedUserUids: updatedLikedUserUids,
    });
  } else {
    console.log("Document not found");
  }
};

// --------------------- 댓글 ---------------------

// 해당 댓글 삭제
export const deleteComment = async (docId) => {
  const db = getFirestore();
  await deleteDoc(doc(db, "comments", docId));
};

// 해당 댓글 수정
export const updateComment = async (docId, newPost) => {
  const db = getFirestore();
  const docRef = doc(db, "comments", docId);
  await updateDoc(docRef, {
    content: newPost.content,
    updateDate: new Date(),
  });
};

// 해당 posts의 댓글 commentCount를 토글
export const toggleCommentCount = async (docId, number) => {
  const db = getFirestore();
  const docRef = doc(db, "posts", docId);
  await updateDoc(docRef, {
    commentCount: increment(number),
  });
  return;
};
