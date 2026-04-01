import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Coffee, Landmark, Building, ShoppingBag, Star } from 'lucide-react';
import { Navbar, Hero } from './components/Navigation';
import { BusinessCard, CategoryItem, ReviewCard } from './components/Business';
import { BusinessProfile } from './components/BusinessProfile';
import { MOCK_BUSINESSES, MOCK_REVIEWS } from './data/mock';
import { Business } from './types';
import { Toaster } from 'sonner';
import './lib/i18n';

const CATEGORIES = [
  { name: 'Banks', icon: Landmark, image: 'https://images.unsplash.com/photo-1541354346786-a7406485ff39?auto=format&fit=crop&q=80&w=800' },
  { name: 'Cafes', icon: Coffee, image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/9e99553b-30f0-4e4b-84f2-5d7e53442c4d/ethiopian-cafe-category-94202514-1775071407694.webp' },
  { name: 'Real Estate', icon: Building, image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/9e99553b-30f0-4e4b-84f2-5d7e53442c4d/business-real-estate-category-76df9b4d-1775071400841.webp' },
  { name: 'Traditional Dress', icon: ShoppingBag, image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/9e99553b-30f0-4e4b-84f2-5d7e53442c4d/traditional-clothing-category-d1111f7b-1775071406206.webp' },
];

function App() {
  const { t } = useTranslation();
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);

  if (selectedBusiness) {
    const businessReviews = MOCK_REVIEWS.filter(r => r.businessId === selectedBusiness.id);
    return (
      <div className="min-h-screen bg-gray-50">
        <Toaster position="top-center" />
        <Navbar />
        <BusinessProfile 
          business={selectedBusiness} 
          reviews={businessReviews} 
          onBack={() => setSelectedBusiness(null)} 
        />
      </div>
    );
  }

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
            <button className="text-green-600 font-bold hover:underline">{t('see_all')}</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES.map((cat, idx) => (
              <CategoryItem key={idx} {...cat} />
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
              {MOCK_BUSINESSES.map((business) => (
                <div key={business.id} onClick={() => setSelectedBusiness(business)}>
                  <BusinessCard business={business} />
                </div>
              ))}
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
}

export default App;