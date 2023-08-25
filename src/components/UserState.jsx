import { useState, useEffect } from "react";
import { styled } from "styled-components";
import { FaUserCircle } from "react-icons/fa";
import { SmallNavyButton } from "./styleElements/SmallNavyButton";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { IsSignInStateAtom } from "../recoil/Atoms";
import { getAuth, signOut } from "firebase/auth";
import { SignedInUserInfoSelector } from "../recoil/DatabaseSelectors";
import { Link, useNavigate } from "react-router-dom";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

export const UserState = () => {
  const uid = localStorage.getItem("uid");
  const user = useRecoilValue(SignedInUserInfoSelector(uid));
  const navigation = useNavigate();
  const setIsSignInState = useSetRecoilState(IsSignInStateAtom);

  const [userImage, setUserImage] = useState(null);

  useEffect(() => {
    if (user?.accountType === "google") return;

    const storage = getStorage();
    const filePath = `profileImg/${uid}.jpg`;
    const imageRef = ref(storage, filePath);
    getDownloadURL(imageRef)
      .then((url) => {
        setUserImage(url);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const auth = getAuth();
  const handleLogout = () => {
    if (window.confirm("로그아웃 할까요?")) {
      signOut(auth)
        .then(() => {
          setIsSignInState(false);
          localStorage.removeItem("uid");
          sessionStorage.clear();
          navigation("/");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    } else {
      return;
    }
  };

  return (
    <UserStateContainer>
      <div>
        {userImage ? (
          <img src={userImage} alt="profile-image" className="profile-image" />
        ) : (
          <UserIcon />
        )}
      </div>
      <div className="user-info">
        <div className="user-name">{user?.name}님</div>
        <div className="user-email">{user?.email}</div>
        <div className="buttons">
          <Link to="my-page">
            {user?.accountType === "email" && (
              <SmallNavyButton>My</SmallNavyButton>
            )}
          </Link>
          <SmallNavyButton onClick={handleLogout}>로그아웃</SmallNavyButton>
        </div>
      </div>
    </UserStateContainer>
  );
};

const UserStateContainer = styled.div`
  padding: 6px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.color.dark};
  border-radius: 12px;

  .profile-image {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-right: 8px;
  }

  .user-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .user-name {
    font-size: 14px;
    font-weight: 900;
  }

  .user-email {
    font-size: 12px;
  }

  .buttons {
    button {
      margin-right: 4px;
    }
  }
`;

const UserIcon = styled(FaUserCircle)`
  font-size: 64px;
  margin-right: 8px;
`;
