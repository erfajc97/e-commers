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
import ProtectedRoutes from './components/ProtectedRoutes'
import User from './pages/User'
import SignUp from './pages/SignUp'

function App() {
  // const [count, setCount] = useState(0)

  const loading = useSelector((state) => state.isLoiding);

  return (
    <div className="App">
      <HashRouter>
        <AppNavBar />
        {loading && <Loading />}
        <br />
        <br />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductosDetails />} />
          <Route path="/login/" element={<Login />} />
          <Route path="/user/" element={<User />} />
          <Route path="/singUp/" element={<SignUp />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/purchases/" element={<Purchases />} />
          </Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App
