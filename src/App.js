import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import NavBar from './Components/NavBar.tsx';
import Home from './Components/Home.tsx'
import Archives from './Components/Archives.tsx';
import AddArchive from './Components/AddArchive.tsx';

function App() {
  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/archives' element={<Archives/>} />
        <Route path='/archives/0' element={<AddArchive/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
