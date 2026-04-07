import React from 'react';
import { Link } from 'react-router-dom';

// ─── Mock Data ───────────────────────────────────────────────────────────────
const mockBusiness = {
  id: 'commercial-bank-of-ethiopia',
  name: 'Commercial Bank of Ethiopia',
  category: 'Banking & Finance',
  overallRating: 4.1,
  totalReviews: 1284,
  location: 'Bole Road, Addis Ababa, Ethiopia',
  phone: '+251 11 551 5004',
  website: 'https://www.combanketh.et',
  description:
    'The Commercial Bank of Ethiopia (CBE) is the largest commercial bank in Ethiopia. Established in 1942, CBE has been a cornerstone of Ethiopian financial services, offering retail banking, corporate solutions, and international trade finance.',
  reviews: [
    {
      id: 1,
      user: 'Abebe Girma',
      rating: 5,
      date: 'March 28, 2026',
      title: 'Exceptional digital banking experience',
      text: 'The CBE mobile app has completely changed how I manage my finances. Transfers are instant, the UI is clean, and the 24/7 support team actually picks up the phone. Very impressed with how far they have come in recent years.',
    },
    {
      id: 2,
      user: 'Tigist Alemu',
      rating: 3,
      date: 'March 15, 2026',
      title: 'Long queues but friendly staff',
      text: 'In-branch service can be painfully slow during peak hours — I waited nearly two hours last Thursday. That said, the staff were polite and genuinely helpful once I reached the counter. The Birr digital wallet works without issues.',
    },
    {
      id: 3,
      user: 'Dawit Bekele',
      rating: 4,
      date: 'February 22, 2026',
      title: 'Solid bank with growing digital tools',
      text: 'CBE feels like it is in the middle of a digital transformation. Online banking is reliable for daily tasks, and the new ATM network around the city has reduced my branch visits dramatically. A few more self-service options would be perfect.',
    },
  ],
};

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
function ReviewCard({
  review,
}: {
  review: (typeof mockBusiness.reviews)[0];
}) {
  const initials = review.user
    .split(' ')
    .map((n) => n[0])
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
            <p className="font-semibold text-gray-900 text-sm">{review.user}</p>
            <time className="text-xs text-gray-400">{review.date}</time>
          </div>

          {/* Stars */}
          <StarRow rating={review.rating} size="sm" />

          {/* Title */}
          <p className="mt-2 font-semibold text-gray-800 text-sm leading-snug">
            {review.title}
          </p>

          {/* Body */}
          <p className="mt-1 text-gray-600 text-sm leading-relaxed">{review.text}</p>
        </div>
      </div>
    </article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export function BusinessProfile() {
  const b = mockBusiness;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* ── Nav ── */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link to="/" className="text-xl font-extrabold text-green-600 tracking-tight">
            Trust<span className="text-gray-900">Ethio</span>
          </Link>
          <nav className="flex gap-3">
            <Link
              to="/login"
              className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="text-sm bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-1.5 rounded-lg transition-colors"
            >
              Sign up
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* ── Hero / Business Header ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 mb-8 shadow-sm">
          {/* Category breadcrumb */}
          <p className="text-xs uppercase tracking-widest text-green-600 font-semibold mb-2">
            {b.category}
          </p>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4">{b.name}</h1>

          {/* Rating row */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <RatingBadge rating={b.overallRating} />
            <StarRow rating={b.overallRating} size="lg" />
            <span className="text-gray-500 text-sm">
              {b.totalReviews.toLocaleString()} reviews
            </span>
          </div>

          {/* CTA */}
          <Link
            to={`/business/${b.id}/write-review`}
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
              <span className="text-gray-400 font-normal text-base">({b.totalReviews.toLocaleString()})</span>
            </h2>

            {b.reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}

            {/* See-all placeholder */}
            <p className="text-center text-sm text-gray-400 pt-2">
              Showing 3 of {b.totalReviews.toLocaleString()} reviews
            </p>
          </section>

          {/* ── Right: Sidebar ── */}
          <aside className="space-y-5">
            {/* About */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3 text-base">About this Company</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">{b.description}</p>

              <ul className="space-y-3 text-sm">
                {/* Location */}
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
                  <span>{b.location}</span>
                </li>

                {/* Phone */}
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
                  <a href={`tel:${b.phone}`} className="hover:text-green-600 transition-colors">
                    {b.phone}
                  </a>
                </li>

                {/* Website */}
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
                    href={b.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-green-600 transition-colors truncate"
                  >
                    {b.website.replace('https://', '')}
                  </a>
                </li>
              </ul>
            </div>

            {/* Rating distribution teaser */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3 text-base">Rating Distribution</h3>
              {[5, 4, 3, 2, 1].map((star) => {
                // Fake distribution percentages
                const pct = [55, 25, 12, 5, 3][5 - star];
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
