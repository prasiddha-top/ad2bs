import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import AdToBs from './pages/AdToBs'
import BsToAd from './pages/BsToAd'
import About from './pages/About'
import './App.css'

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ad-to-bs" element={<AdToBs />} />
          <Route path="/bs-to-ad" element={<BsToAd />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
