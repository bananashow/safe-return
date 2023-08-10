import { getFirestore, doc, getDoc } from "firebase/firestore";

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
