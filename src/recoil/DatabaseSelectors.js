import { selector } from "recoil";
import { collection, getDocs, getFirestore } from "firebase/firestore";

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
