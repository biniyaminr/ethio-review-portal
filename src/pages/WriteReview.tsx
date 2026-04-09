import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Star } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

// ─── Mock business name (swap for a real lookup once data layer is ready) ────
const MOCK_BUSINESS_NAME = 'Commercial Bank of Ethiopia';

// ─── Star Rater Component ─────────────────────────────────────────────────────
function StarRater({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const [hover, setHover] = useState(0);

  const labels: Record<number, string> = {
    1: 'Bad',
    2: 'Poor',
    3: 'Average',
    4: 'Good',
    5: 'Excellent',
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="flex gap-1"
        onMouseLeave={() => setHover(0)}
        role="group"
        aria-label="Star rating selector"
      >
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = star <= (hover || value);
          return (
            <button
              key={star}
              type="button"
              id={`star-${star}`}
              aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
              onClick={() => onChange(star)}
              onMouseEnter={() => setHover(star)}
              className={`transition-all duration-100 focus:outline-none ${
                filled ? 'scale-110 drop-shadow-md' : 'opacity-40 hover:opacity-70'
              }`}
            >
              <Star
                className={`w-10 h-10 transition-colors ${
                  filled
                    ? 'fill-green-500 text-green-500'
                    : 'fill-gray-200 text-gray-300'
                }`}
              />
            </button>
          );
        })}
      </div>
      {/* Label under stars */}
      <span
        className={`text-sm font-semibold transition-colors ${
          hover || value ? 'text-green-600' : 'text-gray-400'
        }`}
      >
        {labels[hover || value] ?? 'Select a rating'}
      </span>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export const WriteReview = () => {
  const { id: businessId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const businessPath = `/business/${businessId ?? 'commercial-bank-of-ethiopia'}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (rating === 0) {
      setError('Please select a star rating before submitting.');
      return;
    }
    if (content.trim().length < 20) {
      setError('Your review must be at least 20 characters long.');
      return;
    }

    if (!businessId) {
      setError('Business ID is missing or invalid.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setError('You must be logged in to post a review.');
        navigate('/login');
        return;
      }

      // We use the fields requested by the user. If your db schema is different (e.g. user_name instead of reviewer_name), adjust accordingly.
      const { error: insertError } = await supabase.from('reviews').insert([
        {
          business_id: businessId,
          user_id: user.id,
          reviewer_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Anonymous',
          rating: rating,
          content: content
        }
      ]);

      if (insertError) throw insertError;

      setSubmitted(true);

      setTimeout(() => {
        navigate(businessPath);
      }, 2200);
    } catch (err: any) {
      setError(err.message || 'Failed to post review. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ── Success Screen ──────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
        <div className="max-w-md w-full bg-white border border-gray-100 rounded-2xl shadow-sm p-10 text-center space-y-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900">Review Posted!</h2>
          <p className="text-gray-500 text-sm">
            Thank you for sharing your experience. Redirecting you back to the
            business profile…
          </p>
          <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
            <div className="bg-green-500 h-1.5 rounded-full animate-[progress_2.2s_linear_forwards]" />
          </div>
        </div>
      </div>
    );
  }

  // ── Form ────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Nav */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link to="/" className="text-xl font-extrabold text-green-600 tracking-tight">
            Trust<span className="text-gray-900">Ethio</span>
          </Link>
          <Link
            to={businessPath}
            className="text-sm text-gray-500 hover:text-gray-800 flex items-center gap-1 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to profile
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 flex flex-col justify-center items-center px-4 py-12">
        <div className="max-w-xl w-full bg-white border border-gray-100 rounded-2xl shadow-sm p-8 sm:p-10 space-y-8">

          {/* Header */}
          <div className="text-center space-y-1">
            <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Star className="text-white w-6 h-6 fill-current" />
            </div>
            <p className="text-xs uppercase tracking-widest text-green-600 font-semibold">
              You're reviewing
            </p>
            <h1 className="text-2xl font-extrabold text-gray-900">{MOCK_BUSINESS_NAME}</h1>
            <p className="text-sm text-gray-400">
              Your honest feedback helps others make informed decisions.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>

            {/* Error banner */}
            {error && (
              <div className="bg-red-50 text-red-600 text-sm border border-red-100 rounded-xl px-4 py-3 text-center">
                {error}
              </div>
            )}

            {/* ── Star Rater ── */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 text-center">
                Overall rating <span className="text-red-400">*</span>
              </label>
              <StarRater value={rating} onChange={setRating} />
            </div>

            <hr className="border-gray-100" />

            {/* ── Review Title ── */}
            <div className="space-y-1.5">
              <label
                htmlFor="review-title"
                className="block text-sm font-semibold text-gray-700"
              >
                Review title
              </label>
              <input
                id="review-title"
                type="text"
                maxLength={100}
                placeholder="e.g. Great service but long queues"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 text-gray-900 placeholder-gray-400 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-shadow"
              />
              <p className="text-right text-xs text-gray-300">{title.length}/100</p>
            </div>

            {/* ── Review Content ── */}
            <div className="space-y-1.5">
              <label
                htmlFor="review-content"
                className="block text-sm font-semibold text-gray-700"
              >
                Your review <span className="text-red-400">*</span>
              </label>
              <textarea
                id="review-content"
                rows={5}
                minLength={20}
                placeholder="Tell others about your experience — what went well, what could be improved…"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 text-gray-900 placeholder-gray-400 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-shadow resize-none"
              />
              <p
                className={`text-right text-xs ${
                  content.length > 0 && content.length < 20
                    ? 'text-red-400'
                    : 'text-gray-300'
                }`}
              >
                {content.length} / 20 min
              </p>
            </div>

            {/* ── Submit ── */}
            <button
              id="post-review-btn"
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 bg-green-600 hover:bg-green-700 disabled:opacity-75 disabled:cursor-not-allowed text-white text-sm font-bold rounded-xl shadow-md shadow-green-600/20 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Posting...
                </>
              ) : (
                <>
                  <Star className="w-4 h-4 fill-current" />
                  Post Review
                </>
              )}
            </button>

            <p className="text-center text-xs text-gray-400">
              By submitting you agree to our{' '}
              <span className="underline cursor-pointer hover:text-gray-600">
                review guidelines
              </span>
              .
            </p>
          </form>
        </div>
      </main>
    </div>
  );
};
