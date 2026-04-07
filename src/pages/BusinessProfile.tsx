import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { Navbar } from '../components/Navigation';

// ─── Helpers ─────────────────────────────────────────────────────────────────
function StarRow({ rating, size = 'md' }: { rating: number; size?: 'sm' | 'md' | 'lg' }) {
  const sizes = { sm: 'text-base', md: 'text-xl', lg: 'text-3xl' };
  return (
    <span className={`flex gap-0.5 ${sizes[size]}`} aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => {
        if (rating >= i) {
          return (
            <span key={i} className="text-green-500">
              ★
            </span>
          );
        }
        if (rating >= i - 0.5) {
          return (
            <span key={i} className="text-green-500 opacity-60">
              ★
            </span>
          );
        }
        return (
          <span key={i} className="text-gray-300">
            ★
          </span>
        );
      })}
    </span>
  );
}

function RatingBadge({ rating }: { rating: number }) {
  const color =
    rating >= 4 ? 'bg-green-500' : rating >= 3 ? 'bg-yellow-400' : 'bg-red-400';
  return (
    <span
      className={`inline-flex items-center justify-center px-3 py-1 rounded-md text-white font-bold text-lg ${color}`}
    >
      {rating.toFixed(1)}
    </span>
  );
}

// ─── Review Card ─────────────────────────────────────────────────────────────
function ReviewCard({ review }: { review: any }) {
  const userName = review.user_name || review.userName || 'Anonymous';
  const initials = userName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase();

  return (
    <article className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 text-green-700 font-semibold flex items-center justify-center text-sm select-none">
          {initials}
        </div>

        <div className="flex-1 min-w-0">
          {/* User & Date */}
          <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
            <p className="font-semibold text-gray-900 text-sm">{userName}</p>
            <time className="text-xs text-gray-400">
              {new Date(review.created_at || review.date).toLocaleDateString()}
            </time>
          </div>

          {/* Stars */}
          <StarRow rating={review.rating} size="sm" />

          {/* Body */}
          <p className="mt-2 text-gray-600 text-sm leading-relaxed">{review.comment || review.text}</p>
        </div>
      </div>
    </article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export function BusinessProfile() {
  const { id } = useParams();
  
  const [business, setBusiness] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch Business
        const { data: businessData, error: businessError } = await supabase
          .from('businesses')
          .select('*')
          .eq('id', id)
          .single();

        if (businessError) throw businessError;

        // Fetch Reviews
        const { data: reviewsData, error: reviewsError } = await supabase
          .from('reviews')
          .select('*')
          .eq('business_id', id)
          .order('created_at', { ascending: false });

        if (reviewsError) throw reviewsError;

        setBusiness(businessData);
        setReviews(reviewsData || []);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch business profile.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 font-sans flex items-center justify-center">
        <div className="text-center text-gray-500">
          <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          Loading profile...
        </div>
      </div>
    );
  }

  if (error || !business) {
    return (
      <div className="min-h-screen bg-gray-50 font-sans">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong.</h2>
          <p className="text-red-500 mb-8">{error || 'Business not found'}</p>
          <Link to="/" className="text-white bg-green-600 px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Derive rating & counts or use from DB if available
  const overallRating = business.rating || 0;
  const reviewCount = business.reviewCount || reviews.length;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* ── Hero / Business Header ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 mb-8 shadow-sm">
          {/* Category breadcrumb */}
          <p className="text-xs uppercase tracking-widest text-green-600 font-semibold mb-2">
            {business.category}
          </p>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4">{business.name}</h1>

          {/* Rating row */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <RatingBadge rating={overallRating} />
            <StarRow rating={overallRating} size="lg" />
            <span className="text-gray-500 text-sm">
              {reviewCount.toLocaleString()} reviews
            </span>
          </div>

          {/* CTA */}
          <Link
            to={`/business/${business.id}/write-review`}
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-xl shadow transition-colors"
            id="write-review-cta"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.232 5.232l3.536 3.536M9 13l6-6m0 0L9 13m6-6l-6 6M3 21h18"
              />
            </svg>
            Write a Review
          </Link>
        </section>

        {/* ── Two-Column Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Left: Reviews Feed ── */}
          <section className="lg:col-span-2 space-y-4">
            <h2 className="text-lg font-bold text-gray-900">
              Reviews{' '}
              <span className="text-gray-400 font-normal text-base">({reviewCount.toLocaleString()})</span>
            </h2>

            {reviews.length === 0 ? (
               <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center shadow-sm">
                 <p className="text-4xl mb-3">🌟</p>
                 <p className="text-gray-900 font-bold mb-1">No reviews yet.</p>
                 <p className="text-gray-500 mb-6">Be the first to share your experience with {business.name}.</p>
                 <Link
                   to={`/business/${business.id}/write-review`}
                   className="text-green-600 font-bold hover:underline"
                 >
                   Write a review
                 </Link>
               </div>
            ) : (
                reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                ))
            )}
          </section>

          {/* ── Right: Sidebar ── */}
          <aside className="space-y-5">
            {/* About */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3 text-base">About this Company</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">{business.description}</p>

              <ul className="space-y-3 text-sm">
                {/* Location */}
                {business.location && (
                    <li className="flex items-start gap-2 text-gray-700">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                    </svg>
                    <span>{business.location}</span>
                    </li>
                )}

                {/* Phone */}
                {business.phone && (
                    <li className="flex items-center gap-2 text-gray-700">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-green-500 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                    </svg>
                    <a href={`tel:${business.phone}`} className="hover:text-green-600 transition-colors">
                        {business.phone}
                    </a>
                    </li>
                )}

                {/* Website */}
                {business.website && (
                    <li className="flex items-center gap-2 text-gray-700">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-green-500 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                        />
                    </svg>
                    <a
                        href={business.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-green-600 transition-colors truncate"
                    >
                        {business.website.replace('https://', '')}
                    </a>
                    </li>
                )}
              </ul>
            </div>
            
            {/* Rating distribution teaser */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3 text-base">Rating Distribution</h3>
              {[5, 4, 3, 2, 1].map((star) => {
                // Determine percentage roughly based on reviews distribution, or gracefully fallback
                const filtered = reviews.filter(r => Math.floor(r.rating) === star);
                const count = filtered.length;
                const pct = reviews.length ? Math.round((count / reviews.length) * 100) : 0;
                
                return (
                  <div key={star} className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-gray-500 w-4 text-right">{star}</span>
                    <span className="text-green-500 text-xs">★</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-400 w-6">{pct}%</span>
                  </div>
                );
              })}
            </div>

          </aside>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="mt-16 border-t border-gray-200 bg-white py-6 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} TrustEthio · Built for Ethiopian consumers
      </footer>
    </div>
  );
}
