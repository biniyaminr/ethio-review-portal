import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Star, MapPin, Phone, Globe, ShieldCheck, Camera, Send, X, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Business, Review } from '../types';
import { toast } from 'sonner';

export const BusinessProfile = ({ business, reviews, onBack }: { business: Business, reviews: Review[], onBack: () => void }) => {
  const { t } = useTranslation();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });

  const validatePhone = (phone: string) => {
    // Basic Ethiopian phone regex: +251..., 09..., 07...
    const ethioRegex = /^(\+251|0)(9|7)\d{8}$/;
    return ethioRegex.test(phone.replace(/\s/g, ''));
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReview.rating === 0) {
      toast.error('Please select a star rating');
      return;
    }
    if (newReview.comment.length < 10) {
      toast.error('Review must be at least 10 characters long');
      return;
    }
    toast.success('Review submitted for moderation!');
    setShowReviewForm(false);
    setNewReview({ rating: 0, comment: '' });
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button onClick={onBack} className="text-green-600 font-bold mb-6 flex items-center gap-2">
            <X className="w-4 h-4 rotate-45" /> Back to Search
        </button>

        <div className="bg-white rounded-[2rem] border border-gray-100 p-8 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3 lg:w-1/4">
                <img src={business.image} className="w-full aspect-square object-cover rounded-2xl shadow-lg" alt={business.name} />
            </div>
            <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{business.category}</span>
                    {business.verified && <span className="flex items-center gap-1 text-blue-600 text-xs font-bold"><ShieldCheck className="w-4 h-4" /> Verified</span>}
                </div>
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{business.name}</h1>
                <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-6 h-6 ${i < Math.floor(business.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} />
                        ))}
                    </div>
                    <span className="text-xl font-bold text-gray-900">{business.rating}</span>
                    <span className="text-gray-500">({business.reviewCount} {t('review_count')})</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600 mb-8">
                    <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-gray-400" />
                        <span>{business.location}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-gray-400" />
                        <span>{business.phone}</span>
                    </div>
                </div>
                <button 
                  onClick={() => setShowReviewForm(true)}
                  className="bg-green-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700 transition-colors shadow-lg shadow-green-600/20"
                >
                    {t('write_review')}
                </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Reviews</h3>
                {reviews.map(review => (
                    <div key={review.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-700 font-bold text-xl">
                                {review.userName.charAt(0)}
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">{review.userName}</h4>
                                <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div className="flex gap-0.5 mb-4">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-green-500 fill-green-500' : 'text-gray-200'}`} />
                            ))}
                        </div>
                        <p className="text-gray-700 leading-relaxed mb-6">"{review.comment}"</p>
                        <div className="flex items-center gap-6 pt-4 border-t border-gray-50 text-sm font-medium text-gray-400">
                            <button className="flex items-center gap-2 hover:text-green-600 transition-colors">
                                <span className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">👍</span>
                                Helpful ({review.likes})
                            </button>
                            <button className="hover:text-red-600 transition-colors">Report</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h4 className="font-bold text-gray-900 mb-4">About {business.name}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{business.description}</p>
                    <hr className="my-4 border-gray-100" />
                    <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">Website</span>
                            <a href="#" className="text-green-600 font-medium">Visit site</a>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">Industry</span>
                            <span className="text-gray-900 font-medium">{business.category}</span>
                        </div>
                    </div>
                </div>
                <div className="bg-green-600 p-6 rounded-2xl shadow-lg shadow-green-600/20 text-white">
                    <h4 className="font-bold text-xl mb-2">Claim this business</h4>
                    <p className="text-green-50 text-sm mb-6">Take control of your profile and start responding to customer feedback today.</p>
                    <button className="w-full bg-white text-green-600 py-3 rounded-xl font-bold hover:bg-green-50 transition-colors">
                        Claim Now
                    </button>
                </div>
            </div>
        </div>
      </div>

      <AnimatePresence>
        {showReviewForm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
              onClick={() => setShowReviewForm(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl p-8 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Write a Review</h3>
                <button onClick={() => setShowReviewForm(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <X className="w-6 h-6" />
                </button>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-3">How was your experience with {business.name}?</p>
                <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                        <button 
                            key={s}
                            onClick={() => setNewReview({ ...newReview, rating: s })}
                            className={`p-1 transition-transform active:scale-90`}
                        >
                            <Star className={`w-10 h-10 ${s <= newReview.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} />
                        </button>
                    ))}
                </div>
              </div>

              <div className="mb-6">
                <textarea 
                    rows={5}
                    placeholder="Tell us about your experience..."
                    className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-all resize-none"
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                />
              </div>

              <div className="flex items-center gap-4 mb-8">
                <button className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-green-600 transition-colors">
                    <Camera className="w-5 h-5" />
                    Add Photo
                </button>
              </div>

              <button 
                onClick={handleReviewSubmit}
                className="w-full bg-green-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-green-700 transition-colors"
              >
                Submit Review <Send className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};