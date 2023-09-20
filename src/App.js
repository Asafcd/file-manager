import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import NavBar from './Components/NavBar.tsx';
import Home from './Components/Home.tsx'
import Archives from './Components/Archives.tsx';
import AddArchive from './Components/AddArchive.tsx';
import OneArchive from './Components/OneArchive.tsx';
import RegistroForm from './Components/RegistroForm.tsx';

function App() {
  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/archives' element={<Archives/>} />
        <Route path='/archives/0' element={<AddArchive/>} />
        <Route path='/archives/:id' element={<OneArchive/>} />
        <Route path='/archives/:id/registro/0' element={<RegistroForm/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
