// styles/GlobalStyles.js
import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: #0a0a0a;
    color: #fff;
    line-height: 1.6;
    overflow-x: hidden;
    min-height: 100vh;
  }

  /* Hebrew font support */
  .hebrew-text {
    font-family: 'David', 'SBL Hebrew', 'Noto Serif Hebrew', 'Times New Roman', serif;
    direction: rtl;
    text-align: right;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    background: none;
    font-family: inherit;
  }

  input, select, textarea {
    font-family: inherit;
    outline: none;
  }

  img, video {
    max-width: 100%;
    display: block;
  }

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-track {
    background: #1a1a1a;
  }

  ::-webkit-scrollbar-thumb {
    background: #ffd700;
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #ffed4a;
  }

  /* Selection */
  ::selection {
    background: rgba(255, 215, 0, 0.3);
    color: #fff;
  }

  /* Mobile optimizations */
  @media (max-width: 768px) {
    body {
      font-size: 14px;
    }
  }
`