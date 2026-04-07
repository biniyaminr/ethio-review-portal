import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, LogOut, Edit2, Calendar, Mail, User } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

// ─── Mock Data ────────────────────────────────────────────────────────────────
const mockUser = {
  name: 'Abebe Kebede',
  email: 'abebe.kebede@example.com',
  joinDate: 'January 12, 2025',
  initials: 'AK',
};

const userReviews = [
  {
    id: 1,
    businessName: 'Commercial Bank of Ethiopia',
    businessId: 'commercial-bank-of-ethiopia',
    rating: 5,
    date: 'March 28, 2026',
    reviewText:
      'The CBE mobile app has completely changed how I manage my finances. Transfers are instant, the UI is clean, and the 24/7 support team actually picks up the phone. Very impressed.',
  },
  {
    id: 2,
    businessName: 'Tomoca Coffee',
    businessId: 'tomoca-coffee',
    rating: 5,
    date: 'February 14, 2026',
    reviewText:
      'Tomoca remains unbeatable. The roast quality and the atmosphere in Piassa are one-of-a-kind. Been coming here for years and it never disappoints. A true Addis institution.',
  },
  {
    id: 3,
    businessName: 'Sunshine Real Estate',
    businessId: 'sunshine-real-estate',
    rating: 3,
    date: 'January 5, 2026',
    reviewText:
      'The project handover was two months late with no proactive communication from the team. The build quality is good, but the customer service experience needs serious improvement.',
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function StarRow({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`text-lg ${
            rating >= i ? 'text-green-500' : 'text-gray-200'
          }`}
        >
          ★
        </span>
      ))}
    </span>
  );
}

function RatingPill({ rating }: { rating: number }) {
  const bg = rating >= 4 ? 'bg-green-500' : rating >= 3 ? 'bg-yellow-400' : 'bg-red-400';
  return (
    <span className={`inline-flex items-center justify-center w-9 h-7 rounded-lg text-white text-sm font-bold ${bg}`}>
      {rating}.0
    </span>
  );
}

// ─── Review Card ─────────────────────────────────────────────────────────────
function UserReviewCard({ review }: { review: (typeof userReviews)[0] }) {
  return (
    <article className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
      {/* Business name + date */}
      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
        <div>
          <p className="text-xs uppercase tracking-widest text-green-600 font-semibold mb-0.5">
            Your review of
          </p>
          <Link
            to={`/business/${review.businessId}`}
            className="font-bold text-gray-900 hover:text-green-700 transition-colors text-base leading-tight"
          >
            {review.businessName}
          </Link>
        </div>
        <time className="text-xs text-gray-400 flex-shrink-0 mt-1">{review.date}</time>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2 mb-3">
        <RatingPill rating={review.rating} />
        <StarRow rating={review.rating} />
      </div>

      {/* Review text */}
      <p className="text-sm text-gray-600 leading-relaxed">{review.reviewText}</p>

      {/* Actions */}
      <div className="mt-4 flex gap-3 border-t border-gray-100 pt-3">
        <button className="text-xs text-gray-400 hover:text-green-600 flex items-center gap-1 transition-colors">
          <Edit2 className="w-3 h-3" />
          Edit review
        </button>
        <Link
          to={`/business/${review.businessId}`}
          className="text-xs text-gray-400 hover:text-green-600 flex items-center gap-1 transition-colors"
        >
          <Star className="w-3 h-3" />
          View business
        </Link>
      </div>
    </article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export function UserDashboard() {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* ── Nav ── */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link to="/" className="text-xl font-extrabold text-green-600 tracking-tight">
            Trust<span className="text-gray-900">Ethio</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 hidden sm:block">{mockUser.email}</span>
            <div className="w-8 h-8 rounded-full bg-green-600 text-white font-bold text-sm flex items-center justify-center select-none">
              {mockUser.initials}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* ── Page title ── */}
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-gray-900">My Dashboard</h1>
          <p className="text-sm text-gray-400 mt-1">
            Welcome back, {mockUser.name.split(' ')[0]} 👋
          </p>
        </div>

        {/* ── Two-column grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* ── Left sidebar: Profile ── */}
          <aside className="lg:col-span-1 space-y-4">
            {/* Profile card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm text-center">
              {/* Avatar */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-700 text-white font-extrabold text-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-600/20 select-none">
                {mockUser.initials}
              </div>

              <h2 className="font-bold text-gray-900 text-lg leading-tight">{mockUser.name}</h2>
              <p className="text-sm text-gray-400 mt-0.5 truncate">{mockUser.email}</p>

              {/* Stats strip */}
              <div className="mt-4 bg-gray-50 rounded-xl p-3 flex justify-around text-center">
                <div>
                  <p className="text-xl font-extrabold text-gray-900">{userReviews.length}</p>
                  <p className="text-xs text-gray-400">Reviews</p>
                </div>
                <div className="border-l border-gray-200" />
                <div>
                  <p className="text-xl font-extrabold text-green-600">
                    {(userReviews.reduce((s, r) => s + r.rating, 0) / userReviews.length).toFixed(1)}
                  </p>
                  <p className="text-xs text-gray-400">Avg. Rating</p>
                </div>
              </div>
            </div>

            {/* Info card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                Account info
              </h3>
              <div className="flex items-start gap-2.5 text-sm text-gray-700">
                <Mail className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="break-all">{mockUser.email}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-gray-700">
                <Calendar className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>Joined {mockUser.joinDate}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-gray-700">
                <User className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>Standard Member</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <button
                id="edit-profile-btn"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:border-green-300 hover:text-green-700 transition-colors shadow-sm"
              >
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </button>
              <button
                id="sign-out-btn"
                onClick={handleSignOut}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-semibold text-red-500 bg-white border border-red-100 rounded-xl hover:bg-red-50 hover:border-red-300 transition-colors shadow-sm"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </aside>

          {/* ── Main content: Review history ── */}
          <section className="lg:col-span-3 space-y-4">
            {/* Section header */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">
                My Reviews{' '}
                <span className="text-gray-400 font-normal text-base">
                  ({userReviews.length})
                </span>
              </h2>
              <Link
                to="/categories/banks"
                className="text-sm text-green-600 hover:text-green-700 font-semibold transition-colors"
              >
                + Write a new review
              </Link>
            </div>

            {userReviews.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center shadow-sm">
                <p className="text-4xl mb-3">✍️</p>
                <p className="font-bold text-gray-800 text-lg mb-1">No reviews yet</p>
                <p className="text-sm text-gray-400 mb-5">
                  Share your experience and help others in Ethiopia make informed decisions.
                </p>
                <Link
                  to="/categories/banks"
                  className="inline-block text-sm bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors"
                >
                  Browse businesses
                </Link>
              </div>
            ) : (
              userReviews.map((review) => (
                <UserReviewCard key={review.id} review={review} />
              ))
            )}
          </section>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="mt-16 border-t border-gray-200 bg-white py-6 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} TrustEthio · Built for Ethiopian consumers
      </footer>
    </div>
  );
}
