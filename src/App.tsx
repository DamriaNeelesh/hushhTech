import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Leadership from './components/Leadership';
import Philosophy from './components/Philosophy';
import Footer from './components/Footer';
import Login from './pages/Login'
import Contact from './pages/Contact';
import { ChakraProvider } from '@chakra-ui/react';
import Consumers from './pages/services/consumers';
import Business from './pages/services/business';
import Signup from './pages/Signup';
import Faq from './pages/faq';
import Career from './pages/career';

function App() {
  return (
        <ChakraProvider>
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/about/leadership" element={<Leadership />} />
          <Route path="/about/philosophy" element={<Philosophy />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path='/services/consumers' element={<Consumers/>} />
          <Route path='/services/business' element={<Business/>}/>
          <Route path='/Signup' element={<Signup/>}/>
          <Route path='/faq' element={<Faq/>}/>
          <Route path="/career" element={<Career/>} />
          <Route path="/career/*" element={<Career />} />

        </Routes>
        <Footer />
      </div>
    </Router>
    </ChakraProvider>
  );
}

export default App;