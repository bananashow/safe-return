import { selector, selectorFamily } from "recoil";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

const uid = localStorage.getItem("uid");

// uid로 사용자 정보 가져오기
export const SignedInUserInfoSelector = selector({
  key: "signedInUserInfoSelector",
  get: async () => {
    const db = getFirestore();
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
    }
  },
});

// --------------------- 게시판 ---------------------

// 전체 게시물 + docId
export const AllPostsSelector = selector({
  key: "allPostsSelector",
  get: async () => {
    const db = getFirestore();
    const querySnapshot = await getDocs(collection(db, "posts"));
    const allData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return allData;
  },
});

// 검색
export const SearchPostSelector = selectorFamily({
  key: "searchPostSelector",
  get:
    (searchWord) =>
    ({ get }) => {
      const allData = get(AllPostsSelector);
      const lowercaseSearchWord = searchWord.toLowerCase();

      const fileredData = allData.filter((post) => {
        const lowercaseTitle = post.title.toLowerCase();
        const lowercaseName = post.name.toLowerCase();

        return (
          lowercaseTitle.includes(lowercaseSearchWord) ||
          lowercaseName.includes(lowercaseSearchWord)
        );
      });
      return fileredData;
    },
});

// 카테고리별 필터링
export const CategoryPostSelector = selectorFamily({
  key: "categoryPostSelector",
  get:
    (category) =>
    ({ get }) => {
      const allData = get(AllPostsSelector);
      let selectedCategory;

      if (category === "share") {
        selectedCategory = "나누어요";
      } else if (category === "report") {
        selectedCategory = "제보해요";
      } else if (category === "") {
        return allData;
      }

      const fileredData = allData.filter((post) => {
        return post.category.includes(selectedCategory);
      });
      return fileredData;
    },
});

// docId로 게시글 정보 가져오기
export const PostInfoSelector = selectorFamily({
  key: "postInfoSelector",
  get: (docId) => async () => {
    const db = getFirestore();
    const docRef = doc(db, "posts", docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
    }
  },
});

// 로그인된 계정으로 좋아요를 누른 게시물들의 docId 가져오기
export const LikedPostDocIdsByUserSelector = selector({
  key: "likedPostDocIdsByUserSelector",
  get: async () => {
    const likedPostDocIds = [];
    const db = getFirestore();
    const postsRef = collection(db, "posts");
    const q = query(postsRef, where("likedUserUids", "array-contains", uid));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      likedPostDocIds.push(doc.id);
    });
    return likedPostDocIds;
  },
});

// --------------------- 댓글 ---------------------

// postDocId가 같은 댓글들 가져오기
export const CommentsSelector = selectorFamily({
  key: "commentsSelector",
  get: (postDocId) => async () => {
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
  },
});

// docId의 조회수, 댓글수, 좋아요수를 가져옴
export const GetCountsSelector = selectorFamily({
  key: "getCountsSelector",
  get: (docId) => async () => {
    const db = getFirestore();
    const docRef = doc(db, "posts", docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
    }
  },
});
