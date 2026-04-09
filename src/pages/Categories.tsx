import React from 'react';
import { Link } from 'react-router-dom';
import { Landmark, Coffee, Building, ShoppingBag } from 'lucide-react';
import { Navbar } from '../components/Navigation';

const ALL_CATEGORIES = [
  { slug: 'banks', label: 'Banking & Finance', icon: Landmark, description: 'Find top-rated financial institutions.' },
  { slug: 'cafes', label: 'Cafes & Coffee', icon: Coffee, description: 'Discover the best coffee spots in town.' },
  { slug: 'real-estate', label: 'Real Estate', icon: Building, description: 'Explore trusted real estate developers and agencies.' },
  { slug: 'traditional-dress', label: 'Traditional Dress', icon: ShoppingBag, description: 'Shop exquisite Ethiopian cultural outfits.' },
];

export function Categories() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans selection:bg-green-100 selection:text-green-900">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Categories</h1>
          <p className="text-lg text-gray-500 max-w-2xl">
            Browse through our curated list of business sectors in Ethiopia to find exactly what you're looking for, backed by real customer reviews.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ALL_CATEGORIES.map((category) => {
            const Icon = category.icon;
            return (
              <Link 
                key={category.slug} 
                to={`/categories/${category.slug}`}
                className="group relative bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-green-300 transition-all duration-300 flex flex-col"
              >
                <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-green-100 transition-transform">
                  <Icon className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">
                  {category.label}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-6 flex-grow">
                  {category.description}
                </p>
                <div className="flex items-center text-green-600 font-semibold text-sm group-hover:gap-2 transition-all">
                  Explore <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
      
      <footer className="border-t border-gray-200 bg-white py-8 text-center text-sm text-gray-400 mt-12">
        © {new Date().getFullYear()} TrustEthio · Built for Ethiopian consumers
      </footer>
    </div>
  );
}
