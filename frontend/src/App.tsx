
import './App.css';
import Toolbar from './UI/ToolBar.tsx';
import { Container, CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Artists from './features/artists/components/Artists.tsx';
import Albums from './features/albums/components/Albums.tsx';

function App() {

  return (
    <>
      <CssBaseline/>
      <header>
        <Toolbar/>
      </header>
      <main>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<Artists />} />
            <Route path="/albums/:id" element={<Albums />} />
            {/*<Route path="/albums" element={<Albums/>}/>*/}
            <Route path="*" element={<h1>Not found</h1>} />
          </Routes>
        </Container>
      </main>
    </>
  );
}

export default App;
