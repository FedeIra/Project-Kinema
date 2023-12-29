import TVShowDetail from './Components/Details/TVShowDetail/TVShowDetail.jsx';
import HomeMovies from './Components/Home/HomeMovies.jsx';
import HomeTVShows from './Components/Home/HomeTVShows.jsx';
import HomeSearch from './Components/Home/HomeSearch.jsx';

import AuthProvider from './Components/AuthContext/AuthContext.jsx';
import LandingPage from './Components/LandingPage/LandingPage';
import MovieDetail from './Components/Details/MovieDetail/MovieDetail';
// Import style:
import './App.css';
import { ProtectedRoute } from './Components/AuthContext/ProtectedRoute.js';
import UserProfile from './Components/UserData/UserProfile/UserProfile.jsx';
import { Routes, Route } from 'react-router-dom';
import Login from './Components/UserData/Login/Login.jsx';
import Register from './Components/UserData/Register/Register.jsx';
import Home from './Components/Home/Home';
import PaymentCheckout from './Components/UserData/PaymentCheckout/PaymentCheckout.jsx';
import PaymentCheckoutRent from './Components/UserData/PaymentCheckout/PaymentCheckoutRent.jsx';
import Plan from './Components/UserData/Register/Plan.jsx';
import Admin from './Components/UserData/Admin/Admin.jsx';
import Watch from './Components/Home/Watch.jsx';
import Overview from './Components/Overview/Overview.jsx';
import Owner from './Components/UserData/Owner/Owner.jsx';
import AboutUs from './Components/Footer links/About us/AboutUs.jsx';
import KinemaContent from './Components/UserData/Admin/KinemaContent.jsx';
import UserComments from './Components/UserData/Admin/UserComments.jsx';
import NotFound from './Components/Not Found/Not Found.jsx';
import Contact from './Components/Footer links/Contact/Contact.jsx';
import ForgotPassword from './Components/UserData/ForgotPassword/ForgotPassword.jsx';

// Create App component:
export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/start" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/start" element={<Register />} />
        <Route path="/recover_password" element={<ForgotPassword />} />
        <Route path="/register/plan" element={<Plan />} />
        <Route path="/register/plan/start" element={<Plan />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/watch/:id" element={<Watch />} />
        <Route path="/payment" element={<PaymentCheckout />} />
        <Route path="/payment/start" element={<PaymentCheckout />} />
        <Route path="/payment/upgrade" element={<PaymentCheckout />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/content" element={<KinemaContent />} />
        <Route path="/admin/content/:id" element={<UserComments />} />
        <Route path="/owner" element={<Owner />} />
        <Route
          path="/payment/rent/movie/:id"
          element={<PaymentCheckoutRent />}
        />
        <Route
          path="/payment/rent/tv_show/:id"
          element={<PaymentCheckoutRent />}
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route path="/home/movies" element={<HomeMovies />} />
        <Route path="/home/tv_shows" element={<HomeTVShows />} />
        <Route path="/home/search" element={<HomeSearch />} />
        <Route path="/home/movie_details/:id" element={<MovieDetail />} />
        <Route path="/home/tv_show_details/:id" element={<TVShowDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/about_us" element={<AboutUs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}
