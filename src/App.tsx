import { ThemeProvider } from 'styled-components'

import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router';

import { defaultTheme } from './styles/themas/default';
import { GlobalStyle } from './styles/global';
import { CyclesContext, CyclesContextProvider } from './contexts/CyclesContext';

export function App() {

  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CyclesContextProvider>
          <Router />
        </CyclesContextProvider>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  )
}
