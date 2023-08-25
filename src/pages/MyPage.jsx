import { styled } from "styled-components";
import { BasicHeader } from "../components/styleElements/BasicHeader";
import { BasicInput } from "../components/styleElements/BasicInput";
import { SignUpInButton } from "../components/styleElements/SignUpInButton";
import { useRef, useState } from "react";
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from "recoil";
import { SignedInUserInfoSelector } from "../recoil/DatabaseSelectors";
import { useNavigate } from "react-router-dom";
import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";

export const MyPage = () => {
  const navigation = useNavigate();
  const userInfo = useRecoilValue(SignedInUserInfoSelector);
  const userRefresh = useRecoilRefresher_UNSTABLE(SignedInUserInfoSelector);
  const passwordRef = useRef(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState({
    password: "",
    passwordCheck: "",
  });

  const handleEdit = async () => {
    if (userInfo.password !== currentPassword) {
      alert("현재 비밀번호를 확인해 주세요.");
      passwordRef.current.focus();
      return;
    }

    if (currentPassword === newPassword.password) {
      alert("현재 비밀번호와 변경할 비밀번호가 동일합니다.");
      passwordRef.current.focus();
      return;
    }

    try {
      const auth = getAuth();
      const user = auth.currentUser;
      const credentials = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      await reauthenticateWithCredential(user, credentials);
      await updatePassword(user, newPassword.password);

      alert("비밀번호가 변경되었습니다.");
      userRefresh();
      navigation("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <SignUpContainer>
        <BasicHeader>비밀번호 변경</BasicHeader>
        <BasicInput
          ref={passwordRef}
          placeHolder="비밀번호를 입력하세요"
          inputType="password"
          onChange={(e) => setCurrentPassword(e.target.value)}
        ></BasicInput>

        <BasicInput
          placeHolder="변경할 비밀번호를 입력하세요"
          inputType="password"
          onChange={(e) =>
            setNewPassword((prev) => ({
              ...prev,
              password: e.target.value,
            }))
          }
        ></BasicInput>
        {newPassword.password !== newPassword.passwordCheck &&
          newPassword.passwordCheck && (
            <div className="warning">비밀번호가 다릅니다.</div>
          )}
        <BasicInput
          placeHolder="변경할 비밀번호를 재입력하세요"
          inputType="password"
          onChange={(e) =>
            setNewPassword((prev) => ({
              ...prev,
              passwordCheck: e.target.value,
            }))
          }
        ></BasicInput>

        <SignUpInButton onClick={handleEdit}>변경하기</SignUpInButton>
      </SignUpContainer>
    </>
  );
};

const SignUpContainer = styled.div`
  margin: 0 auto;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;

  input {
    margin: 6px 0;
  }

  .warning {
    font-size: 11px;
    color: #ee2727;
    text-align: right;
    margin: 2px 0;
  }

  .profile-image {
    width: 180px;
    height: 180px;
    border-radius: 50%;
    margin-right: 8px;
  }
`;
