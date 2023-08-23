import { Route, Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { MainPage } from "./pages/MainPage";
import { FindPage } from "./pages/FindPage";
import { SignInPage } from "./pages/SignInPage";
import { SignUpPage } from "./pages/SignUpPage";
import { SharingSpacePage } from "./pages/SharingSpacePage";
import { PostPage } from "./pages/PostPage";
import { PostViewPage } from "./pages/PostViewPage";
import { PostEditPage } from "./pages/PostEditPage";
import { LocationPage } from "./pages/LocationPage";
import { Suspense } from "react";
import { LoadingPage } from "./pages/LoadingPage";
import PrivateRoute from "./components/PrivateRoute";
import { useRecoilValue } from "recoil";
import { IsSignInStateAtom } from "./recoil/Atoms";
import { Banner } from "./components/Banner";

function App() {
  const isSignedIn = useRecoilValue(IsSignInStateAtom);
  return (
    <>
      <Suspense fallback={<LoadingPage />}>
        <NavBar />
        <Banner />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/find" element={<FindPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route
            path="/sharing-space"
            element={
              <PrivateRoute
                component={<SharingSpacePage />}
                isSignedIn={isSignedIn}
              />
            }
          />
          <Route
            path="/post"
            element={
              <PrivateRoute component={<PostPage />} isSignedIn={isSignedIn} />
            }
          />
          <Route
            path="/sharing-space/:docId"
            element={
              <PrivateRoute
                component={<PostViewPage />}
                isSignedIn={isSignedIn}
              />
            }
          />
          <Route
            path="/sharing-space/:docId/edit"
            element={
              <PrivateRoute
                component={<PostEditPage />}
                isSignedIn={isSignedIn}
              />
            }
          />
          <Route path="/location" element={<LocationPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
