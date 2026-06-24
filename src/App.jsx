import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './Components/Header'
import Footer from './Components/Footer'
import Home from './Pages/Home'
import About from './Pages/About'
import WalkTours from './Pages/Walk-Tours'
import KhakiLab from './Pages/KhakiLab'
import Foundation from './Pages/Foundation'
import Blogs from './Pages/Blogs'
import BlogDetail from "./Pages/BlogDetail";
import CancellationRefundPolicy from './Pages/Cancellation-Refund-Policy'
import Contact from './Pages/Contact'
import Faq from './Pages/Faqs'
import NotFound from './Pages/NotFound';
import PrivacyPolicy from './Pages/Privacy-Policy'
import GroupTourDetail from './Pages/GroupTourDetail'
import PrivateTourDetail from './Pages/PrivateTourDetail'
import PublicTourDetail from './Pages/PublicTourDetail'
import PublicEventTourDetail from './Pages/PublicEventTourDetail'
import Checkout from './Pages/Checkout';
import SuccessPage from './Pages/SuccessPage'
import RequestSuccess from './Pages/RequestSuccessPage'
import InternationalTour from './Pages/InternationalTour'
import InternationalDetail from './Pages/InternationalDetail'

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); 

  return null;
}

const App = () => {
  return (
    <Router>
      <Header />
      <ScrollToTop /> 
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact-us' element={<Contact />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path='/walk-tours' element={<WalkTours/>} />
        <Route path='/khaki-lab' element={<KhakiLab/>} />
        <Route path='/foundation' element={<Foundation/>} />
        <Route path='/cancellation-refund-policy' element={<CancellationRefundPolicy/>} />
        <Route path='/faqs' element={<Faq />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        <Route path='/international-tour' element={<InternationalTour />} />
        <Route path='/international-tour/:slug' element={<InternationalDetail />} />
        <Route path='/thank-you' element={<SuccessPage />} />
        <Route path='/message-received' element={<RequestSuccess />} />
        <Route path='/group-tours/:slug' element={<GroupTourDetail />} />
        <Route path='/private-tours/:slug' element={<PrivateTourDetail />} />
        <Route path='/public-walks/:slug' element={<PublicTourDetail />} />
        <Route path='/public-events/:slug' element={<PublicEventTourDetail />} />
        <Route path="*" element={<NotFound />} />
      
      </Routes>
      <Footer />
    </Router>
  );
};

export default App
