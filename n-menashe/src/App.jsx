// App.jsx
import { ThemeProvider } from 'styled-components'
import { GlobalStyles } from './styles/GlobalStyles'
import { theme } from './styles/theme'
import AppRouter from './components/Router/AppRouter'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppRouter />
    </ThemeProvider>
  )
}

export default App