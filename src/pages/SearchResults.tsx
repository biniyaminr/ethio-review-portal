import React, { useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Star, SlidersHorizontal, X, ChevronDown } from 'lucide-react';

// ─── Mock Data ────────────────────────────────────────────────────────────────
const ALL_BUSINESSES = [
  {
    id: 'commercial-bank-of-ethiopia',
    name: 'Commercial Bank of Ethiopia',
    category: 'banks',
    categoryLabel: 'Banking & Finance',
    overallRating: 4.1,
    totalReviews: 1284,
    description:
      "Ethiopia's largest commercial bank serving millions of customers across 1,800+ branches nationwide.",
    location: 'Bole Road, Addis Ababa',
    verified: true,
  },
  {
    id: 'awash-bank',
    name: 'Awash Bank',
    category: 'banks',
    categoryLabel: 'Banking & Finance',
    overallRating: 4.4,
    totalReviews: 876,
    description:
      'A leading private bank in Ethiopia known for innovative digital banking and swift customer service.',
    location: 'Kirkos, Addis Ababa',
    verified: true,
  },
  {
    id: 'tomoca-coffee',
    name: 'Tomoca Coffee',
    category: 'cafes',
    categoryLabel: 'Cafes & Coffee',
    overallRating: 4.8,
    totalReviews: 2103,
    description:
      'An Addis Ababa institution since 1953 — beloved for its rich, slow-roasted Ethiopian espresso.',
    location: 'Piassa, Addis Ababa',
    verified: true,
  },
  {
    id: 'kaldi-coffee',
    name: "Kaldi's Coffee",
    category: 'cafes',
    categoryLabel: 'Cafes & Coffee',
    overallRating: 4.5,
    totalReviews: 1567,
    description:
      "Ethiopia's largest specialty coffee chain with a modern atmosphere and carefully sourced single-origin beans.",
    location: 'Bole, Addis Ababa',
    verified: false,
  },
  {
    id: 'sunshine-real-estate',
    name: 'Sunshine Real Estate',
    category: 'real-estate',
    categoryLabel: 'Real Estate',
    overallRating: 3.9,
    totalReviews: 342,
    description:
      'A trusted property developer with a portfolio of over 15,000 residential units across Addis Ababa.',
    location: 'CMC, Addis Ababa',
    verified: true,
  },
  {
    id: 'ethio-real-estate',
    name: 'Ethio Real Estate',
    category: 'real-estate',
    categoryLabel: 'Real Estate',
    overallRating: 3.6,
    totalReviews: 217,
    description:
      'Residential and commercial property sales and leasing services across major Ethiopian cities.',
    location: 'Sarbet, Addis Ababa',
    verified: false,
  },
  {
    id: 'habesha-cultural-dress',
    name: 'Habesha Cultural Dress',
    category: 'traditional-dress',
    categoryLabel: 'Traditional Dress',
    overallRating: 4.7,
    totalReviews: 589,
    description:
      'Handwoven Habesha kemis and other traditional Ethiopian garments made by skilled local artisans.',
    location: 'Merkato, Addis Ababa',
    verified: true,
  },
  {
    id: 'ethiopian-heritage-fashion',
    name: 'Ethiopian Heritage Fashion',
    category: 'traditional-dress',
    categoryLabel: 'Traditional Dress',
    overallRating: 4.3,
    totalReviews: 411,
    description:
      'Modern takes on traditional Ethiopian dress combining age-old weaving techniques with contemporary cuts.',
    location: '4 Kilo, Addis Ababa',
    verified: false,
  },
];

const ALL_CATEGORIES = [
  { slug: 'banks', label: 'Banking & Finance' },
  { slug: 'cafes', label: 'Cafes & Coffee' },
  { slug: 'real-estate', label: 'Real Estate' },
  { slug: 'traditional-dress', label: 'Traditional Dress' },
];

const SORT_OPTIONS = [
  { value: 'rating-desc', label: 'Highest Rated' },
  { value: 'reviews-desc', label: 'Most Reviewed' },
  { value: 'rating-asc', label: 'Lowest Rated' },
  { value: 'name-asc', label: 'A → Z' },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function StarRow({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`text-lg ${
            rating >= i
              ? 'text-green-500'
              : rating >= i - 0.5
              ? 'text-green-300'
              : 'text-gray-200'
          }`}
        >
          ★
        </span>
      ))}
    </span>
  );
}

function RatingPill({ rating }: { rating: number }) {
  const bg =
    rating >= 4.5
      ? 'bg-green-600'
      : rating >= 4
      ? 'bg-green-500'
      : rating >= 3
      ? 'bg-yellow-400'
      : 'bg-red-400';
  return (
    <span
      className={`inline-flex items-center justify-center w-10 h-8 rounded-lg text-white text-sm font-bold ${bg}`}
    >
      {rating.toFixed(1)}
    </span>
  );
}

// ─── Business Card ────────────────────────────────────────────────────────────
function BusinessCard({ business }: { business: (typeof ALL_BUSINESSES)[0] }) {
  return (
    <Link
      to={`/business/${business.id}`}
      id={`business-card-${business.id}`}
      className="group bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-green-200 transition-all flex gap-4 items-start"
    >
      {/* Avatar */}
      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-green-50 text-green-700 font-bold flex items-center justify-center text-lg select-none border border-green-100">
        {business.name[0]}
      </div>

      <div className="flex-1 min-w-0">
        {/* Name + verified */}
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <h2 className="font-bold text-gray-900 group-hover:text-green-700 transition-colors truncate">
            {business.name}
          </h2>
          {business.verified && (
            <span className="inline-flex items-center gap-1 text-xs text-green-700 bg-green-50 border border-green-100 px-2 py-0.5 rounded-full font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Verified
            </span>
          )}
        </div>

        {/* Category + location */}
        <p className="text-xs text-gray-400 mb-2">
          {business.categoryLabel} · {business.location}
        </p>

        {/* Rating row */}
        <div className="flex items-center gap-2 mb-3">
          <RatingPill rating={business.overallRating} />
          <StarRow rating={business.overallRating} />
          <span className="text-xs text-gray-400">
            {business.totalReviews.toLocaleString()} reviews
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
          {business.description}
        </p>
      </div>

      {/* Chevron */}
      <div className="flex-shrink-0 text-gray-300 group-hover:text-green-500 transition-colors mt-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}

// ─── Filter Sidebar ────────────────────────────────────────────────────────────
function FilterSidebar({
  selectedCategories,
  onToggleCategory,
  sortBy,
  onSortChange,
  onClear,
}: {
  selectedCategories: string[];
  onToggleCategory: (slug: string) => void;
  sortBy: string;
  onSortChange: (v: string) => void;
  onClear: () => void;
}) {
  const hasFilters = selectedCategories.length > 0 || sortBy !== 'rating-desc';

  return (
    <aside className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-gray-900">
          <SlidersHorizontal className="w-4 h-4 text-green-600" />
          Filters
        </div>
        {hasFilters && (
          <button
            onClick={onClear}
            className="text-xs text-red-400 hover:text-red-600 flex items-center gap-1 transition-colors"
          >
            <X className="w-3 h-3" /> Clear
          </button>
        )}
      </div>

      {/* Sort */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
          Sort by
        </p>
        <div className="relative">
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-xl px-3 py-2.5 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow cursor-pointer"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
          Categories
        </p>
        <ul className="space-y-1">
          {ALL_CATEGORIES.map((cat) => {
            const checked = selectedCategories.includes(cat.slug);
            const count = ALL_BUSINESSES.filter((b) => b.category === cat.slug).length;
            return (
              <li key={cat.slug}>
                <label
                  htmlFor={`filter-${cat.slug}`}
                  className={`flex items-center gap-2.5 px-2 py-1.5 rounded-lg cursor-pointer transition-colors text-sm ${
                    checked
                      ? 'bg-green-50 text-green-800'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <input
                    id={`filter-${cat.slug}`}
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggleCategory(cat.slug)}
                    className="w-3.5 h-3.5 accent-green-600 rounded"
                  />
                  <span className="flex-1">{cat.label}</span>
                  <span className="text-xs text-gray-400">{count}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Min Rating */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
          Min. Rating
        </p>
        <div className="flex flex-col gap-1.5">
          {[4, 3, 2].map((min) => (
            <label
              key={min}
              className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-gray-900 transition-colors select-none"
            >
              <input
                type="radio"
                name="min-rating"
                className="accent-green-600"
                defaultChecked={min === 4}
              />
              <span className="text-green-500 text-base">{'★'.repeat(min)}</span>
              <span className="text-gray-300 text-base">{'★'.repeat(5 - min)}</span>
              <span className="text-xs text-gray-400">& up</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export function SearchResults() {
  const { category } = useParams<{ category: string }>();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    category ? [category] : []
  );
  const [sortBy, setSortBy] = useState('rating-desc');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const toggleCategory = (slug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((c) => c !== slug) : [...prev, slug]
    );
  };

  const clearFilters = () => {
    setSelectedCategories(category ? [category] : []);
    setSortBy('rating-desc');
  };

  // ── Derived data ────────────────────────────────────────────────────────────
  const pageTitle = useMemo(() => {
    if (query) return `Search results for "${query}"`;
    if (category) {
      const cat = ALL_CATEGORIES.find((c) => c.slug === category);
      return `Top Rated Businesses in ${cat?.label ?? category}`;
    }
    return 'All Businesses';
  }, [category, query]);

  const results = useMemo(() => {
    let list = [...ALL_BUSINESSES];

    // Query filter
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(
        (b) =>
          b.name.toLowerCase().includes(q) ||
          b.description.toLowerCase().includes(q) ||
          b.categoryLabel.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      list = list.filter((b) => selectedCategories.includes(b.category));
    }

    // Sort
    list.sort((a, b) => {
      if (sortBy === 'rating-desc') return b.overallRating - a.overallRating;
      if (sortBy === 'rating-asc') return a.overallRating - b.overallRating;
      if (sortBy === 'reviews-desc') return b.totalReviews - a.totalReviews;
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      return 0;
    });

    return list;
  }, [query, selectedCategories, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* ── Nav ── */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <Link to="/" className="text-xl font-extrabold text-green-600 tracking-tight flex-shrink-0">
            Trust<span className="text-gray-900">Ethio</span>
          </Link>

          {/* Search bar */}
          <div className="flex-1 max-w-xl hidden sm:block">
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="search"
                defaultValue={query}
                placeholder="Search businesses…"
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50"
              />
            </div>
          </div>

          <nav className="flex gap-3 flex-shrink-0">
            <Link
              to="/login"
              className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors hidden sm:block"
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* ── Page Heading ── */}
        <div className="mb-6 flex items-start justify-between gap-4 flex-wrap">
          <div>
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-1">
              <Link to="/" className="hover:text-green-600 transition-colors">Home</Link>
              <span>›</span>
              {category ? (
                <>
                  <Link to="/categories" className="hover:text-green-600 transition-colors">Categories</Link>
                  <span>›</span>
                  <span className="text-gray-600 capitalize">{category.replace('-', ' ')}</span>
                </>
              ) : (
                <span className="text-gray-600">Search</span>
              )}
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900">{pageTitle}</h1>
            <p className="text-sm text-gray-400 mt-1">
              {results.length} {results.length === 1 ? 'business' : 'businesses'} found
            </p>
          </div>

          {/* Mobile filter toggle */}
          <button
            onClick={() => setMobileFiltersOpen((o) => !o)}
            className="lg:hidden inline-flex items-center gap-2 text-sm border border-gray-200 bg-white rounded-xl px-4 py-2 font-medium text-gray-700 hover:border-green-300 transition-colors shadow-sm"
          >
            <SlidersHorizontal className="w-4 h-4 text-green-600" />
            Filters
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* ── Sidebar ── */}
          <div
            className={`lg:col-span-1 ${
              mobileFiltersOpen ? 'block' : 'hidden'
            } lg:block`}
          >
            <FilterSidebar
              selectedCategories={selectedCategories}
              onToggleCategory={toggleCategory}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onClear={clearFilters}
            />
          </div>

          {/* ── Results Feed ── */}
          <section className="lg:col-span-3 space-y-4">
            {results.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center shadow-sm">
                <p className="text-4xl mb-3">🔍</p>
                <p className="font-bold text-gray-800 text-lg mb-1">No results found</p>
                <p className="text-sm text-gray-400">
                  Try adjusting your filters or searching for something else.
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-5 text-sm bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              results.map((business) => (
                <BusinessCard key={business.id} business={business} />
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
