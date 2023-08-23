import { styled } from "styled-components";
import { FaUserCircle } from "react-icons/fa";
import { SmallNavyButton } from "./styleElements/SmallNavyButton";
import {
  useRecoilRefresher_UNSTABLE,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { IsSignInStateAtom } from "../recoil/Atoms";
import { getAuth, signOut } from "firebase/auth";
import { SignedInUserInfoSelector } from "../recoil/DatabaseSelectors";

export const UserState = () => {
  const auth = getAuth();
  const user = useRecoilValue(SignedInUserInfoSelector);
  const setIsSignInState = useSetRecoilState(IsSignInStateAtom);
  const isSignInRefresh = useRecoilRefresher_UNSTABLE(IsSignInStateAtom);

  const handleLogout = () => {
    if (window.confirm("로그아웃 할까요?")) {
      signOut(auth)
        .then(() => {
          setIsSignInState(false);
          localStorage.removeItem("uid");
          isSignInRefresh();
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
        <UserIcon />
      </div>
      <div className="user-info">
        <div className="user-name">{user.name}님</div>
        <div className="user-email">{user.email}</div>
        <div className="buttons">
          <SmallNavyButton>My</SmallNavyButton>
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
