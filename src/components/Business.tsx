import React from 'react';
import { useTranslation } from 'react-i18next';
import { Star, CheckCircle } from 'lucide-react';
import { Business, Review } from '../types';

export const BusinessCard = ({ business }: { business: Business }) => {
  const { t } = useTranslation();
  
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-lg transition-all group cursor-pointer">
      <div className="relative h-48 rounded-xl overflow-hidden mb-4">
        <img 
          src={business.image} 
          alt={business.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-700">
          {business.category}
        </div>
      </div>
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors">{business.name}</h3>
        {business.verified && <CheckCircle className="w-5 h-5 text-blue-500 fill-blue-50/50" />}
      </div>
      <div className="flex items-center gap-2 mb-3">
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`w-4 h-4 ${i < Math.floor(business.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} 
            />
          ))}
        </div>
        <span className="text-sm font-bold text-gray-900">{business.rating}</span>
        <span className="text-sm text-gray-500">({business.reviewCount})</span>
      </div>
      <p className="text-sm text-gray-600 line-clamp-2 mb-4">{business.description}</p>
      <div className="flex items-center justify-between pt-4 border-t border-gray-50">
        <span className="text-xs text-gray-400">{business.location}</span>
        <button className="text-xs font-bold text-green-600 hover:underline">{t('write_review')}</button>
      </div>
    </div>
  );
};

export const CategoryItem = ({ name, icon: Icon, image }: { name: string, icon: any, image: string }) => {
  return (
    <div className="relative group cursor-pointer overflow-hidden rounded-2xl aspect-[4/3]">
      <img src={image} alt={name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
        <div className="p-2 bg-white/20 backdrop-blur-md rounded-lg text-white">
          <Icon className="w-5 h-5" />
        </div>
        <span className="text-white font-bold text-lg">{name}</span>
      </div>
    </div>
  );
};

export const ReviewCard = ({ review }: { review: Review }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold">
          {review.userName.charAt(0)}
        </div>
        <div>
          <h4 className="text-sm font-bold text-gray-900">{review.userName}</h4>
          <p className="text-xs text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="flex gap-0.5 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`w-4 h-4 ${i < review.rating ? 'text-green-500 fill-green-500' : 'text-gray-200'}`} 
          />
        ))}
      </div>
      <p className="text-gray-700 text-sm leading-relaxed mb-4">"{review.comment}"</p>
      <div className="flex items-center gap-4 text-xs font-medium text-gray-400">
        <button className="hover:text-green-600 flex items-center gap-1">
          Helpful ({review.likes})
        </button>
        <button className="hover:text-red-600">Report</button>
      </div>
    </div>
  );
};