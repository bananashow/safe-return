import React, { Suspense } from "react";
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

// Initialize Firebase
const firebaseApp = initializeApp(firebaseKey);

// Initialize Realtime Database and get a reference to the service
getDatabase(firebaseApp);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <BrowserRouter>
          <Suspense fallback="...loading">
            <App />
          </Suspense>
        </BrowserRouter>
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>
);
