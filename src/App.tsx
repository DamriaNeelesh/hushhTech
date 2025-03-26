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
// import Community from './pages/community';
import CommunityList from './pages/community/communityList';
import CommunityPost from './pages/community/communityPost';
import BenefitsPage from './pages/benefits';
import PrivacyPolicy from './pages/privacy-policy';
import CareersPrivacyPolicy from './pages/career-privacy-policy';
import CaliforniaPrivacyPolicy from './pages/california-privacy-policy';
import EUUKPrivacyPolicy from './pages/eu-uk-privacy-policy';
import { useState, useEffect } from 'react';
import config from './resources/config/config';
import NDAPopup from './components/NdaForm';
import Profile from './pages/profile';


function App() {

  const [session, setSession] = useState(null);

  // Fetch user session when app loads
  useEffect(() => {
    config.supabaseClient.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth state changes
    const {
      data: { subscription },
    } = config.supabaseClient.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription?.unsubscribe();
  }, []);
  
  return (
        <ChakraProvider>
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        {/* {session && <NDAPopup />} */}
        <div className='mt-20'>

        
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/about/leadership" element={<Leadership />} />
          <Route path="/about/philosophy" element={<Philosophy />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/benefits" element={<BenefitsPage />} />

          <Route path='/services/consumers' element={<Consumers/>} />
          <Route path='/services/business' element={<Business/>}/>
          <Route path='/Signup' element={<Signup/>}/>
          <Route path='/faq' element={<Faq/>}/>
          <Route path='/profile' element={<Profile/>} />
          <Route path="/career" element={<Career/>} />
          <Route path="/career/*" element={<Career />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy/>}/>
          <Route path='/carrer-privacy-policy' element={<CareersPrivacyPolicy/>}/>
          <Route path="/community" element={<CommunityList/>} />
          <Route path='/california-privacy-policy' element={<CaliforniaPrivacyPolicy/>}/>
          <Route path='/eu-uk-jobs-privacy-policy' element={<EUUKPrivacyPolicy/>}/>
          <Route path="/community/:slug" element={<CommunityPost />} />
            </Routes>
            </div>
        <Footer />
      </div>
  </Router>
    </ChakraProvider>
  );
}

export default App;