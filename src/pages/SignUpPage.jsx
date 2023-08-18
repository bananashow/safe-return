import { styled } from "styled-components";
import { BasicHeader } from "../components/styleElements/BasicHeader";
import { SignUpInInput } from "../components/styleElements/SignUpInInput";
import { SignUpInButton } from "../components/styleElements/SignUpInButton";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { signUpValidation } from "../utils/validation";

export const SignUpPage = () => {
  const navigation = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);
  const nameRef = useRef(null);
  const phoneRef = useRef(null);

  const [user, setUser] = useState({
    id: "",
    email: "",
    password: "",
    name: "",
    phone: "",
    signUpDate: new Date(),
  });
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const auth = getAuth();
  const db = getFirestore();

  const handleSignUp = async () => {
    const isValid = signUpValidation(
      user,
      passwordConfirm,
      emailRef,
      passwordRef,
      passwordConfirmRef,
      nameRef,
      phoneRef
    );

    if (!isValid) return;

    try {
      // authentication에 사용자 생성
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
      userCredential.user;

      // 사용자 정보를 firestore에 추가
      await setDoc(doc(db, "users", userCredential.user.uid), {
        email: user.email,
        password: user.password,
        name: user.name,
        phone: user.phone,
        signUpDate: user.signUpDate,
        accountType: "email",
      });

      // db 저장 후
      alert("가입 되었습니다.\n로그인 페이지로 이동합니다.");
      navigation("/signin");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;

      if (errorCode === "auth/email-already-in-use") {
        alert("이미 사용중인 이메일입니다.");
      } else {
        console.log(errorMessage);
      }
    }
  };

  return (
    <>
      <SignUpContainer>
        <BasicHeader>Sign Up</BasicHeader>
        <SignUpInInput
          ref={emailRef}
          inputType="email"
          placeHolder="이메일을 입력하세요"
          onChange={(e) =>
            setUser((prev) => ({ ...prev, email: e.target.value }))
          }
        ></SignUpInInput>
        <SignUpInInput
          ref={passwordRef}
          placeHolder="비밀번호를 입력하세요"
          onChange={(e) =>
            setUser((prev) => ({ ...prev, password: e.target.value }))
          }
          inputType="password"
        ></SignUpInInput>
        <SignUpInInput
          ref={passwordConfirmRef}
          placeHolder="비밀번호를 재입력하세요"
          inputType="password"
          onChange={(e) => setPasswordConfirm(e.target.value)}
        ></SignUpInInput>
        {(user.password !== passwordConfirm || !passwordConfirm) &&
          passwordConfirm !== "" && (
            <div className="warning">비밀번호가 다릅니다.</div>
          )}

        <div className="hr-wrap">
          <hr /> <span>인적사항</span> <hr />
        </div>
        <SignUpInInput
          ref={nameRef}
          placeHolder="이름을 입력하세요"
          onChange={(e) =>
            setUser((prev) => ({ ...prev, name: e.target.value }))
          }
        ></SignUpInInput>
        <SignUpInInput
          ref={phoneRef}
          placeHolder="휴대폰 번호를 '-'없이 입력하세요"
          onChange={(e) =>
            setUser((prev) => ({ ...prev, phone: e.target.value }))
          }
        ></SignUpInInput>
        <SignUpInButton onClick={handleSignUp}>가입하기</SignUpInButton>
        <div className="login-footer-wrap">
          <div className="login-footer">
            <Link to="/signin">
              <span>로그인하러 가기</span>
            </Link>
          </div>
        </div>
      </SignUpContainer>
    </>
  );
};

const SignUpContainer = styled.div`
  margin: 0 auto;
  width: 300px;

  .hr-wrap {
    margin: 12px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    font-size: 10px;

    hr {
      flex: 1;
      background-color: ${(props) => props.theme.color.navy};
      height: 0.5px;
      border: 0;
    }

    span {
      margin: 0 12px;
    }
  }

  .login-footer-wrap {
    display: flex;
    flex-direction: row-reverse;
    margin: 12px 0;

    .login-footer {
      font-size: 12px;
      user-select: none;
    }
  }

  .warning {
    font-size: 11px;
    color: #ee2727;
    text-align: right;
    margin: 2px 0;
  }
`;
