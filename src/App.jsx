import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ProductosDetails from './pages/ProductosDetails'
import Login from './pages/Login'
import Purchases from './pages/Purchases'
import AppNavBar from './components/AppNavBar'
import Loading from './components/Loading'
import { useSelector } from 'react-redux'

function App() {
  // const [count, setCount] = useState(0)

  const loading = useSelector((state) => state.isLoiding);

  return (
    <div className="App">
      <HashRouter>
        <AppNavBar  />
        { loading && <Loading/>}
        <br /><br />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductosDetails />} />
          <Route path="/login/" element={<Login />} />
          <Route path="/purchases/" element={<Purchases />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App
