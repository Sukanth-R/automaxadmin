import { Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/HomePage';
import Product from './components/product';
import TwoWheel from './components/products/twowheel';
import Update from './components/update';
import Boat from './components/products/boat';
import Water from './components/products/water';
import Fog from './components/products/fog';
import Converter from './components/products/converter';
import Roof from './components/products/roof';
import Tail from './components/products/tail';
import Side from './components/products/side';
import Decorative from './components/products/decorative';
import Contact from './components/contact';
function App() {
  return (
    <>
        <Navbar/>
          <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/components/products/twowheel" element={<TwoWheel/>}/>
          <Route path="/components/products/boat" element={<Boat/>}/>
          <Route path="/components/products/water" element={<Water/>}/>
          <Route path="/components/products/fog" element={<Fog/>}/>
          <Route path="/components/products/converter" element={<Converter/>}/>
          <Route path="/components/products/roof" element={<Roof/>}/>
          <Route path="/components/products/tail" element={<Tail/>}/>
          <Route path="/components/products/side" element={<Side/>}/>
          <Route path="/components/products/decorative" element={<Decorative/>}/>
          <Route path="/components/update/:id" element={<Update/>}/>
          <Route path="/components/contact" element={<Contact/>}/>
          </Routes>

    </>
  );
}

export default App;
