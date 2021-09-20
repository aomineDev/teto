import { createGlobalStyle } from 'styled-components'
import bgImage from 'assets/img/bg.webp'

export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: url(${bgImage}) #000;
    background-size: cover;
    background-position: center;
  }
`
