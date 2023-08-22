import { Navigate } from "react-router-dom";

const PrivateRoute = ({ isSignedIn, component: Component }) => {
  return isSignedIn ? (
    Component
  ) : (
    <Navigate to="/Signin" {...alert("로그인이 필요합니다.")}></Navigate>
  );
};

export default PrivateRoute;
