import { useEffect, useState } from "react";
import { getSignedInUserInfo } from "./getSignedInUserInfo";

// 현재 로그인된 유저의 정보를 가져옴
export const useUserInfo = () => {
  const uid = localStorage.getItem("uid");
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUserInfo = async () => {
      const result = await getSignedInUserInfo(uid);
      setUser(result);
    };

    fetchUserInfo();
  }, [uid]);

  return user;
};
