import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  *, *::before, *::after {
    margin: 0;
    padding: 0;
    list-style: none;
    box-sizing: border-box;
    text-decoration: none;

  }

  body {
    font-family: 'Noto Sans KR', sans-serif;
    background-color: ${(props) => props.theme.color.primary};
  }

  a:link, a:visited, a:hover, a:active { color:black };

`;
export default GlobalStyle;
