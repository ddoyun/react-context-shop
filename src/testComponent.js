import React, { useContext } from 'react';

const themes = {
  light: {
    foreground: 'blue',
    background: '#eee',
  },
  dark: {
    foreground: '#fff',
    background: '#222',
  }
};

const ThemeContext = React.createContext(themes.light);

function App() {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  return (
    <div>
      <ThemeButton />
    </div>
  )
}

function ThemeButton() {
  const theme = useContext(ThemeContext);
  return (
    <button style={{ background: theme.background, color: theme.foreground }}>컨텍스트에 의해 스타일 변경</button>
  )
}

export default App;
