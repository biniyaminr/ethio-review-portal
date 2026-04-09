import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { BusinessProfile } from './pages/BusinessProfile';
import { WriteReview } from './pages/WriteReview';
import { SearchResults } from './pages/SearchResults';
import { Categories } from './pages/Categories';
import { UserDashboard } from './pages/UserDashboard';
import { ClaimBusiness } from './pages/ClaimBusiness';
import './lib/i18n';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/business/:id" element={<BusinessProfile />} />
      <Route path="/business/:id/write-review" element={<WriteReview />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/categories/:category" element={<SearchResults />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/dashboard" element={<UserDashboard />} />
      <Route path="/claim-business" element={<ClaimBusiness />} />
    </Routes>
  );
}

export default App;