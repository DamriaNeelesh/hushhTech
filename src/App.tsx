import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import ReportDetailPage from './pages/reports/reportDetail';
import BenefitsPage from './pages/benefits';
import PrivacyPolicy from './pages/privacy-policy';
import CareersPrivacyPolicy from './pages/career-privacy-policy';
import CaliforniaPrivacyPolicy from './pages/california-privacy-policy';
import EUUKPrivacyPolicy from './pages/eu-uk-privacy-policy';
import { useState, useEffect, ReactNode } from 'react';
import config from './resources/config/config';
import NDAPopup from './components/NdaForm';
import Profile from './pages/profile';
import AuthCallback from './pages/AuthCallback';
import SolutionsPage from './pages/solutions';
import KYCVerificationPage from './pages/kyc-verification/page';
import NDARequestModal from './components/NdaForm';
import InvestorProfilePage from './components/NDARequestModal';
import UserProfilePage from './pages/user-profile/page';
import KYCFormPage from './pages/kyc-form/page';
import { Session } from '@supabase/supabase-js';

// Content wrapper component that applies conditional margin
const ContentWrapper = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '/signUp' || location.pathname === '/solutions';
  const isAuthCallback = location.pathname.startsWith('/auth/callback');
  
  return (
    <div className={`${isHomePage || isAuthCallback ? '' : 'mt-20'}`}>
      {children}
    </div>
  );
};

function App() {
  const [session, setSession] = useState<Session | null>(null);

  // Fetch user session when app loads
  useEffect(() => {
    if (config.supabaseClient) {
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
    }
  }, []);
  
  return (
    <ChakraProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          {/* {session && <NDAPopup />} */}
          <ContentWrapper>
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
              <Route path="/community/*" element={<CommunityPost />} />
              <Route path="/reports/:id" element={<ReportDetailPage />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="/solutions" element={<SolutionsPage />} />
              <Route path='/kyc-verification' element={<KYCVerificationPage/>}/>
              <Route path='/kyc-form' element={<KYCFormPage/>}/>
              <Route path='/nda-form' element={<InvestorProfilePage 
                session={session} 
                onSubmit={(result) => {
                  console.log("NDA submission result:", result);
                  // Handle post-submission actions here
                  if (result === "Approved" || result === "Pending" || result === "Requested permission") {
                    // Redirect to appropriate page on success
                    window.location.href = "/";
                  }
                }} 
              />} />
              <Route path='/user-profile' element={<UserProfilePage/>}/>
            </Routes>
          </ContentWrapper>
          <Footer />
        </div>
      </Router>
    </ChakraProvider>
  );
}

export default App;