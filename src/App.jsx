import { Route, Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { MainPage } from "./pages/MainPage";
import { FindPage } from "./pages/FindPage";
import { SignInPage } from "./pages/SignInPage";
import { SignUpPage } from "./pages/SignUpPage";
import { SharingSpacePage } from "./pages/SharingSpacePage";
import { PostPage } from "./pages/PostPage";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/find" element={<FindPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/sharing-space" element={<SharingSpacePage />} />
        <Route path="/post" element={<PostPage />} />
      </Routes>
    </>
  );
}

export default App;
