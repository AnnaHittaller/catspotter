import { createGlobalStyle } from "styled-components";
import { v } from "./Variables";

export const GlobalStyle = createGlobalStyle`
*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: ${v.babyPowder};
  color: ${v.charcoal};
  font-family: Quicksand, sans-serif;
}

h1,
h2,
h3 {
  font-family: "Yeseva One", serif;
}

p, span, ::placeholder, input, button, label, textarea {
  line-height: 1.5;
  font-family: Quicksand, sans-serif;
}

::placeholder {
  color: ${v.cadetGrey};
  font-size: 1rem;
}

.page {
    padding: 2rem;
}

::-ms-reveal,
::-ms-clear {
  display: none;
}

`;
