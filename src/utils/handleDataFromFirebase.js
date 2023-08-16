import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  increment,
  deleteDoc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";

// uid로 사용자 정보 가져오기
export const getSignedInUserInfo = async (uid) => {
  const db = getFirestore();
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
  }
};

// --------------------- 게시판 ---------------------

// docId로 게시글 정보 가져오기
export const getPostInfo = async (docId) => {
  const db = getFirestore();
  const docRef = doc(db, "posts", docId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
  }
};

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

// --------------------- 댓글 ---------------------

// postDocId가 같은 댓글들 가져오기
export const getComments = async (postDocId) => {
  const commentArr = [];
  const db = getFirestore();
  const q = query(
    collection(db, "comments"),
    where("postDocId", "==", postDocId)
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const comment = doc.data();
    comment.docId = doc.id;
    commentArr.push(comment);
  });
  return commentArr;
};

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

// 해당 posts의 댓글 commentCount를 +1
export const increaseCommentCount = async (docId) => {
  const db = getFirestore();
  const docRef = doc(db, "posts", docId);
  await updateDoc(docRef, {
    commentCount: increment(1),
  });
  return;
};
