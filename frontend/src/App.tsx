import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MapView from './pages/MapView';
import ProfileView from './pages/ProfileView';
import ProviderDashboard from './pages/provider/ProviderDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import { ProtectedRoute } from './components/ProtectedRoute';
import HowItWorksPage from './pages/HowItWorksPage';
import WhyJoinPage from './pages/WhyJoinPage';
import NotFound from './pages/NotFound';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import LegalPage from './pages/LegalPage';
import PackDetailsPage from './pages/PackDetailsPage';
import ReservationSuccessPage from './pages/ReservationSuccessPage';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<MapView />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/why-join" element={<WhyJoinPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/legal" element={<LegalPage />} />
        
        {/* Functional Pages */}
        <Route path="/pack/:id" element={<PackDetailsPage />} />
        <Route path="/reservation/success" element={<ReservationSuccessPage />} />
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={['client', 'provider', 'admin']} />}>
             <Route path="/profile" element={<ProfileView />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['provider']} />}>
            <Route path="/provider" element={<ProviderDashboard />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin" element={<AdminDashboard />} />
        </Route>

        {/* 404 Not Found - Must be last */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background font-sans text-text-main">
        <Navbar />
        <main className="pt-16">
           <AnimatedRoutes />
        </main>
      </div>
    </Router>
  );
}

export default App;
