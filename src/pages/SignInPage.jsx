import { styled } from "styled-components";
import { BasicHeader } from "../components/BasicHeader";
import { SignUpInButton } from "../components/buttonandInput/SignUpInButton";
import { SignUpInInput } from "../components/buttonandInput/SignUpInInput";
import { FcGoogle } from "react-icons/Fc";
import { Link, useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useRef, useState } from "react";
import { signInValidation } from "../utils/validation";
import { useSetRecoilState } from "recoil";
import { IsSignInStateAtom } from "../recoil/Atoms";
import { doc, getFirestore, setDoc } from "firebase/firestore";

export const SignInPage = () => {
  const navigation = useNavigate();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setIsSignInState = useSetRecoilState(IsSignInStateAtom);

  const provider = new GoogleAuthProvider();
  const db = getFirestore();
  const auth = getAuth();

  // 이메일로 로그인
  const handleSignInWithEmail = () => {
    const isValid = signInValidation(email, password, emailRef, passwordRef);
    if (!isValid) return;

    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        localStorage.setItem("uid", userCredential.user.uid);
        setIsSignInState(true);
        navigation("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === "auth/user-not-found") {
          alert("이메일이 존재하지 않습니다.");
          return;
        } else if (errorCode === "auth/wrong-password") {
          alert("비밀번호를 확인해주세요.");
          return;
        } else {
          console.log(errorMessage);
        }
      });
  };

  // 구글 계정으로 로그인
  const handleSignInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        localStorage.setItem("uid", result.user.uid);
        setIsSignInState(true);
        await setDoc(doc(db, "users", result.user.uid), {
          email: result.user.email,
          password: null,
          name: result.user.displayName,
          phone: result.user.phoneNumber,
          signUpDate: result.user.metadata.creationTime,
          accountType: "google",
        });
        navigation("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <LoginContainer>
        <BasicHeader>Sign In</BasicHeader>
        <SignUpInInput
          ref={emailRef}
          inputType="email"
          placeHolder="이메일을 입력하세요"
          onChange={(e) => setEmail(e.target.value)}
        ></SignUpInInput>
        <SignUpInInput
          ref={passwordRef}
          inputType="password"
          placeHolder="비밀번호를 입력하세요"
          onChange={(e) => setPassword(e.target.value)}
        ></SignUpInInput>
        <SignUpInButton onClick={handleSignInWithEmail}>로그인</SignUpInButton>

        <div className="hr-wrap">
          <hr /> <span>또는</span> <hr />
        </div>

        <SignUpInButton
          backgdColor="#fff"
          hoverBackgdColor="#edf0f7"
          fontColor="#111111"
          onClick={handleSignInWithGoogle}
        >
          <ArrangeIcons>
            <StyledFcGoogle />
            구글 계정으로 로그인
          </ArrangeIcons>
        </SignUpInButton>
        <div className="login-footer-wrap">
          <Link to="/signup">
            <div className="login-footer">회원가입</div>
          </Link>
          <div className="login-footer">
            <span>계정 찾기</span> | <span>비밀번호 찾기</span>
          </div>
        </div>
      </LoginContainer>
    </>
  );
};

const LoginContainer = styled.div`
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
    justify-content: space-between;
    margin: 12px 0;

    .login-footer {
      font-size: 12px;
      user-select: none;
    }
  }
`;

const ArrangeIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledFcGoogle = styled(FcGoogle)`
  font-size: 18px;
  margin-right: 12px;
`;
