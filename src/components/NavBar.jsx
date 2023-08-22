import { styled } from "styled-components";
import logo from "../assets/logo.png";
import { Link, useLocation } from "react-router-dom";
import { UserState } from "./UserState";
import { useRecoilValue } from "recoil";
import { IsSignInStateAtom } from "../recoil/Atoms";

export const NavBar = () => {
  const isSignIn = useRecoilValue(IsSignInStateAtom);
  const { pathname } = useLocation();
  const isActive = (path) => pathname === path;

  return (
    <>
      <NavigationContainer>
        <LogoWrap>
          <Link to="/">
            <img src={logo} alt="로고" />
          </Link>
        </LogoWrap>
        <NavList>
          <ul>
            <Link to="/find">
              <li className={isActive("/find") ? "active" : ""}>찾고 있어요</li>
            </Link>
            <Link to="/location">
              <li className={isActive("/location") ? "active" : ""}>
                실종자 위치
              </li>
            </Link>
            <Link to="/sharing-space">
              <li
                className={
                  isActive("/sharing-space") || isActive("/post")
                    ? "active"
                    : ""
                }
              >
                나눔 공간
              </li>
            </Link>
          </ul>
        </NavList>
        <UserContainer>
          {isSignIn ? (
            <UserState />
          ) : (
            <Link to="/signin">
              <div className="login">로그인</div>
            </Link>
          )}
        </UserContainer>
      </NavigationContainer>
    </>
  );
};

const NavigationContainer = styled.nav`
  margin: 0 auto;
  width: 80%;
  display: flex;
  align-items: center;
  padding: 24px 0;
`;

const LogoWrap = styled.div`
  padding: 0 16px;
  img {
    width: 120px;
  }
`;

const NavList = styled.div`
  width: 100%;

  ul {
    display: flex;
    justify-content: space-evenly;
    li {
      padding: 8px 12px;
      color: ${(props) => props.theme.color.darkNavy};
      font-family: "gmarket-bold";
      font-size: 18px;

      &:hover {
        transition: all 0.4s;
        border-radius: 12px;
        background-color: ${(props) => props.theme.color.dark};
      }
    }
    .active {
      border-radius: 12px;
      background-color: ${(props) => props.theme.color.dark};
    }
  }
`;

const UserContainer = styled.div`
  padding: 0 16px;

  .login {
    text-align: center;
    width: 120px;
    padding: 6px 16px;
    border-radius: 12px;
    font-weight: 900;
  }
`;
