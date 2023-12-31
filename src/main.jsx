import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import GlobalStyle from "./style/GlobalStyle.js";
import { ThemeProvider } from "styled-components";
import { theme } from "./style/DefaultTheme.js";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { initializeApp } from "firebase/app";
import firebaseKey from "./firebase/firebaseKey";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// Initialize Firebase
const firebaseApp = initializeApp(firebaseKey);
// Initialize Realtime Database and get a reference to the service
getDatabase(firebaseApp);
getStorage(firebaseApp);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>
);
