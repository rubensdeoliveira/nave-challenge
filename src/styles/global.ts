import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: #ffffff;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 16px 'Montserrat', sans-serif;
  }

  #root {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 32px;
  }

  button {
    cursor: pointer;
  }
`
