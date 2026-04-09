import React from 'react';
import { useTranslation } from 'react-i18next';
import { Star, ShieldCheck, TrendingUp, Globe, Menu, X, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { supabase } from '../lib/supabaseClient';
import { SearchBar } from './SearchBar';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Navbar = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data }) => {
      setIsLoggedIn(!!data.session);
    });
    // Listen for auth changes (login / logout)
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'am' : 'en');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.href = '/'}>
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <Star className="text-white w-6 h-6 fill-current" />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">Trust Ethio</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/categories" className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors">{t('categories')}</Link>
            <Link to="/claim-business" className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors">{t('claim_business')}</Link>
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-green-600 transition-colors"
            >
              <Globe className="w-4 h-4" />
              {i18n.language === 'en' ? 'አማርኛ' : 'English'}
            </button>
            <div className="flex items-center gap-4">
              {isLoggedIn ? (
                <>
                  <Link
                    to="/dashboard"
                    id="nav-my-profile"
                    className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-green-700 px-4 py-2 rounded-lg hover:bg-green-50 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-full bg-green-600 flex items-center justify-center">
                      <User className="text-white w-4 h-4" />
                    </div>
                    My Profile
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="text-sm font-semibold text-red-500 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <button className="text-sm font-semibold text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">{t('auth.login')}</button>
                  </Link>
                  <Link to="/signup">
                    <button className="text-sm font-semibold text-white bg-green-600 px-6 py-2.5 rounded-lg hover:bg-green-700 transition-shadow shadow-md">{t('auth.signup')}</button>
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="md:hidden flex items-center gap-4">
             <button onClick={toggleLanguage} className="p-2 text-gray-500">
                <Globe className="w-5 h-5" />
             </button>
             <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-500">
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
             </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              <Link to="/categories" className="block text-lg font-medium text-gray-700">{t('categories')}</Link>
              <Link to="/claim-business" onClick={() => setIsOpen(false)} className="block text-lg font-medium text-gray-700">{t('claim_business')}</Link>
              <hr />
              {isLoggedIn ? (
                <>
                  <Link to="/dashboard" className="block" onClick={() => setIsOpen(false)}>
                    <button className="w-full text-center py-3 font-semibold text-gray-900 border border-gray-200 rounded-xl flex items-center justify-center gap-2">
                      <User className="w-4 h-4" /> My Profile
                    </button>
                  </Link>
                  <button
                    onClick={() => { handleSignOut(); setIsOpen(false); }}
                    className="w-full text-center py-3 font-semibold text-red-500 border border-red-100 rounded-xl"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block">
                    <button className="w-full text-center py-3 font-semibold text-gray-900 border border-gray-200 rounded-xl">{t('auth.login')}</button>
                  </Link>
                  <Link to="/signup" className="block">
                    <button className="w-full text-center py-3 font-semibold text-white bg-green-600 rounded-xl">{t('auth.signup')}</button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/9e99553b-30f0-4e4b-84f2-5d7e53442c4d/hero-background-addis-ababa-aef32bea-1775071400761.webp" 
          alt="Addis Ababa" 
          className="w-full h-full object-cover opacity-10 brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6"
        >
          {t('hero_title')}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10"
        >
          {t('hero_subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <SearchBar placeholder={t('search_placeholder') || 'Search a company or category…'} />
        </motion.div>

        <div className="mt-12 flex flex-wrap justify-center gap-8 text-gray-400">
            <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-sm font-medium">Verified Businesses</span>
            </div>
            <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm font-medium">Real-time Ratings</span>
            </div>
            <div className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                <span className="text-sm font-medium">1M+ Trust Score</span>
            </div>
        </div>
      </div>
    </section>
  );
};