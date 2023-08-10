import { styled } from "styled-components";
import { FaUserCircle } from "react-icons/fa";
import { SmallNavyButton } from "./buttonandInput/SmallNavyButton";
import { useUserInfo } from "../utils/useUserInfo";
import { useSetRecoilState } from "recoil";
import { IsSignInStateAtom } from "../recoil/Atoms";
import { getAuth, signOut } from "firebase/auth";

export const UserState = () => {
  const auth = getAuth();
  const user = useUserInfo();
  const setIsSignInState = useSetRecoilState(IsSignInStateAtom);

  const handleLogout = () => {
    if (window.confirm("로그아웃 할까요?")) {
      signOut(auth)
        .then(() => {
          setIsSignInState(false);
          localStorage.removeItem("uid");
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
        <div>
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
    gap: 2px;
  }

  .user-name {
    font-size: 14px;
    font-weight: 900;
  }

  .user-email {
    font-size: 12px;
  }
`;

const UserIcon = styled(FaUserCircle)`
  font-size: 64px;
  margin-right: 8px;
`;
