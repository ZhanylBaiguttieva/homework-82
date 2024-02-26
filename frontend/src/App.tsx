
import './App.css';
import Toolbar from './UI/ToolBar.tsx';
import { Container, CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Artists from './features/artists/components/Artists.tsx';
import Albums from './features/albums/components/Albums.tsx';
import Tracks from './features/tracks/components/Tracks.tsx';
import Register from './features/users/Register.tsx';
import Login from './features/users/Login.tsx';

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
            <Route path="/albums/:id" element={<Albums />}/>
            <Route path="/tracks/:id" element={<Tracks />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="*" element={<h1>Not found</h1>} />
          </Routes>
        </Container>
      </main>
    </>
  );
}

export default App;
