import { createGlobalStyle } from "styled-components";
import "./App.css";

const GlobalStyle = createGlobalStyle`

  *, *::before, *::after {
    margin: 0;
    padding: 0;
    list-style: none;
    box-sizing: border-box;
    text-decoration: none;

  }

  body {
    font-family: 'gmarket-medium';
    background-color: ${(props) => props.theme.color.primary};
    ::placeholder,select {
      font-family: 'gmarket-medium';
    }
  }

  a:link, a:visited, a:hover, a:active { color:black };

`;
export default GlobalStyle;
