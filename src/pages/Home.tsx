import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Coffee, Landmark, Building, ShoppingBag, Star } from 'lucide-react';
import { Navbar, Hero } from '../components/Navigation';
import { BusinessCard, CategoryItem, ReviewCard } from '../components/Business';
import { MOCK_REVIEWS } from '../data/mock';
import { Business } from '../types';
import { supabase } from '../lib/supabaseClient';
import { Toaster } from 'sonner';
import { Link } from 'react-router-dom';

const categoryData = [
  { id: 1, title: 'Banks', icon: Landmark, imageSrc: '/images/banks.jpg', href: '/categories/banks' },
  { id: 2, title: 'Cafes', icon: Coffee, imageSrc: '/images/cafes.jpg', href: '/categories/cafes' },
  { id: 3, title: 'Real Estate', icon: Building, imageSrc: '/images/real-estate.jpg', href: '/categories/real-estate' },
  { id: 4, title: 'Traditional Dress', icon: ShoppingBag, imageSrc: '/images/traditional-dress.jpg', href: '/categories/traditional-dress' },
];

export const Home = () => {
  const { t } = useTranslation();
  
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const { data, error: fetchError } = await supabase.from('businesses').select('*').limit(6);
        if (fetchError) throw fetchError;
        setBusinesses(data as Business[]);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch businesses');
      } finally {
        setLoading(false);
      }
    };
    fetchBusinesses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans selection:bg-green-100 selection:text-green-900">
      <Toaster position="top-center" />
      <Navbar />

      <main>
        <Hero />

        {/* Categories Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{t('categories')}</h2>
              <p className="text-gray-500">Explore top rated businesses by sector</p>
            </div>
            <Link to="/categories" className="text-green-600 font-bold hover:underline">{t('see_all')}</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryData.map((cat) => (
              <CategoryItem key={cat.id} name={cat.title} icon={cat.icon} image={cat.imageSrc!} href={cat.href} />
            ))}
          </div>
        </section>

        {/* Featured Businesses */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{t('best_companies')}</h2>
                <p className="text-gray-500">Businesses with the highest Trust Scores this week</p>
              </div>
              <button className="text-green-600 font-bold hover:underline">{t('see_all')}</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {loading ? (
                <div className="col-span-full py-12 text-center text-gray-500">
                  <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  Loading top businesses...
                </div>
              ) : error ? (
                <div className="col-span-full py-8 text-center text-red-500 bg-red-50 rounded-xl border border-red-100">
                  {error}
                </div>
              ) : (
                businesses.map((business) => (
                  <Link to={`/business/${business.id}`} key={business.id} className="block group">
                    <BusinessCard business={business} />
                  </Link>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Recent Reviews */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{t('recent_reviews')}</h2>
              <p className="text-gray-500">See what people are saying about local services</p>
            </div>
            <button className="text-green-600 font-bold hover:underline">{t('see_all')}</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_REVIEWS.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </section>

        {/* Business Claim CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-gray-900 rounded-[2rem] overflow-hidden relative">
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 100 C 20 0 50 0 100 100" fill="white" />
              </svg>
            </div>
            <div className="relative z-10 p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-xl">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Are you a business owner?</h2>
                <p className="text-gray-400 text-lg mb-8">Claim your profile to engage with customers, respond to reviews, and build your reputation in the Ethiopian market.</p>
                <button className="bg-green-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-700 transition-shadow shadow-lg shadow-green-600/20">
                  {t('claim_business')}
                </button>
              </div>
              <div className="flex items-center gap-4 bg-white/5 p-6 rounded-2xl backdrop-blur-sm border border-white/10">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                  <Star className="text-green-500 w-8 h-8 fill-current" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">Trust Score 4.9</div>
                  <div className="text-gray-400">Average claimed business rating</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-50 border-t border-gray-200 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                  <Star className="text-white w-5 h-5 fill-current" />
                </div>
                <span className="text-xl font-bold text-gray-900 tracking-tight">Trust Ethio</span>
              </div>
              <p className="text-gray-500 max-w-sm">
                The most trusted review platform in Ethiopia. Connecting businesses with consumers through transparent and authentic feedback.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-green-600 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-green-600 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-green-600 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-green-600 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-green-600 transition-colors">Guidelines</a></li>
                <li><a href="#" className="hover:text-green-600 transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-green-600 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-green-600 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-green-600 transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">© 2024 Trust Ethio. All rights reserved.</p>
            <div className="flex gap-6">
              <button className="text-gray-400 hover:text-green-600 transition-colors">Facebook</button>
              <button className="text-gray-400 hover:text-green-600 transition-colors">Twitter</button>
              <button className="text-gray-400 hover:text-green-600 transition-colors">Instagram</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
