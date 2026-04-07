import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, TrendingUp, Clock, ArrowUpRight } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Suggestion {
  type: 'business' | 'search';
  label: string;
  meta: string;
  id: string | null;
}

// ─── Mock Suggestions ─────────────────────────────────────────────────────────
const MOCK_SUGGESTIONS: Suggestion[] = [
  // Businesses
  { type: 'business', label: 'Commercial Bank of Ethiopia', meta: 'Banking & Finance', id: 'commercial-bank-of-ethiopia' },
  { type: 'business', label: 'Awash Bank', meta: 'Banking & Finance', id: 'awash-bank' },
  { type: 'business', label: 'Tomoca Coffee', meta: 'Cafes & Coffee', id: 'tomoca-coffee' },
  { type: 'business', label: "Kaldi's Coffee", meta: 'Cafes & Coffee', id: 'kaldi-coffee' },
  { type: 'business', label: 'Sunshine Real Estate', meta: 'Real Estate', id: 'sunshine-real-estate' },
  { type: 'business', label: 'Habesha Cultural Dress', meta: 'Traditional Dress', id: 'habesha-cultural-dress' },
  // Categories / topics
  { type: 'search', label: 'Banks in Addis Ababa', meta: 'Category', id: null },
  { type: 'search', label: 'Best Coffee Shops', meta: 'Category', id: null },
  { type: 'search', label: 'Real Estate Addis Ababa', meta: 'Category', id: null },
  { type: 'search', label: 'Traditional dress shops', meta: 'Category', id: null },
  { type: 'search', label: 'Mobile banking Ethiopia', meta: 'Topic', id: null },
  { type: 'search', label: 'Top rated restaurants', meta: 'Topic', id: null },
];

const TRENDING = [
  'Commercial Bank of Ethiopia',
  'Tomoca Coffee',
  'Awash Bank',
  'Sunshine Real Estate',
];

// ─── Component ────────────────────────────────────────────────────────────────
interface SearchBarProps {
  /** Optional placeholder text */
  placeholder?: string;
  /** Compact size variant for use in navbars etc. */
  compact?: boolean;
}

export function SearchBar({ placeholder = 'Search a company or category…', compact = false }: SearchBarProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<Suggestion[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Filter suggestions as user types ────────────────────────────────────────
  useEffect(() => {
    if (query.trim() === '') {
      setFilteredSuggestions([]);
    } else {
      const q = query.toLowerCase();
      setFilteredSuggestions(
        MOCK_SUGGESTIONS.filter((s) => s.label.toLowerCase().includes(q)).slice(0, 7)
      );
    }
    setActiveIndex(-1);
  }, [query]);

  // ── Close dropdown when clicking outside ────────────────────────────────────
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // ── Navigate on selection ────────────────────────────────────────────────────
  const handleSelect = useCallback(
    (suggestion: Suggestion) => {
      setIsOpen(false);
      setQuery(suggestion.label);
      if (suggestion.type === 'business' && suggestion.id) {
        navigate(`/business/${suggestion.id}`);
      } else {
        navigate(`/search?q=${encodeURIComponent(suggestion.label)}`);
      }
    },
    [navigate]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleTrending = (term: string) => {
    setIsOpen(false);
    navigate(`/search?q=${encodeURIComponent(term)}`);
  };

  // ── Keyboard navigation ──────────────────────────────────────────────────────
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const items = filteredSuggestions.length > 0 ? filteredSuggestions : [];
    if (!isOpen) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, items.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, -1));
    } else if (e.key === 'Enter' && activeIndex >= 0 && items[activeIndex]) {
      e.preventDefault();
      handleSelect(items[activeIndex]);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleFocus = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setIsOpen(true);
  };

  const handleBlur = () => {
    // Delay so clicks on suggestions register before the dropdown closes
    closeTimer.current = setTimeout(() => setIsOpen(false), 150);
  };

  const showTrending = isOpen && query.trim() === '';
  const showResults = isOpen && query.trim() !== '' && filteredSuggestions.length > 0;
  const showNoResults = isOpen && query.trim() !== '' && filteredSuggestions.length === 0;
  const dropdownVisible = showTrending || showResults || showNoResults;

  return (
    <div ref={containerRef} className="relative w-full">
      {/* ── Input bar ── */}
      <form
        onSubmit={handleSubmit}
        className={`flex items-center bg-white border border-gray-200 rounded-2xl shadow-xl focus-within:ring-2 focus-within:ring-green-500 focus-within:border-transparent transition-all ${
          compact ? 'px-3 py-1.5' : 'px-4 py-2'
        } ${dropdownVisible ? 'rounded-b-none border-b-transparent shadow-none ring-2 ring-green-500' : ''}`}
      >
        {/* Search icon */}
        <Search
          className={`flex-shrink-0 text-gray-400 ${compact ? 'w-4 h-4' : 'w-5 h-5'} mr-3`}
        />

        {/* Text input */}
        <input
          ref={inputRef}
          id="search-input"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoComplete="off"
          aria-label="Search"
          aria-autocomplete="list"
          aria-expanded={dropdownVisible}
          className={`flex-1 outline-none bg-transparent text-gray-900 placeholder-gray-400 ${
            compact ? 'text-sm py-1' : 'text-base py-3'
          }`}
        />

        {/* Clear button */}
        {query && (
          <button
            type="button"
            onClick={() => { setQuery(''); inputRef.current?.focus(); }}
            className="flex-shrink-0 text-gray-300 hover:text-gray-500 transition-colors mr-2"
            aria-label="Clear search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </button>
        )}

        {/* Search button */}
        <button
          id="search-submit-btn"
          type="submit"
          className={`flex-shrink-0 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-colors shadow-md shadow-green-600/20 ${
            compact ? 'px-4 py-1.5 text-sm' : 'px-6 py-3 text-sm'
          }`}
        >
          Search
        </button>
      </form>

      {/* ── Dropdown ── */}
      {dropdownVisible && (
        <div
          role="listbox"
          className="absolute left-0 right-0 top-full bg-white border border-green-500 border-t-0 rounded-b-2xl shadow-2xl z-50 overflow-hidden"
        >
          {/* Trending (empty query) */}
          {showTrending && (
            <div className="p-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 px-2 mb-2 flex items-center gap-1.5">
                <TrendingUp className="w-3 h-3" /> Trending searches
              </p>
              <ul>
                {TRENDING.map((term, i) => (
                  <li key={i}>
                    <button
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => handleTrending(term)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-green-50 text-left group transition-colors"
                    >
                      <TrendingUp className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-800 group-hover:text-green-700 font-medium">
                        {term}
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-green-500 ml-auto transition-colors" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Filtered results */}
          {showResults && (
            <ul className="p-2">
              {filteredSuggestions.map((s, i) => {
                const isActive = i === activeIndex;
                return (
                  <li key={i} role="option" aria-selected={isActive}>
                    <button
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => handleSelect(s)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors group ${
                        isActive ? 'bg-green-50' : 'hover:bg-gray-50'
                      }`}
                    >
                      {/* Icon */}
                      <div
                        className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center ${
                          s.type === 'business'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {s.type === 'business' ? (
                          <span className="text-xs font-bold">{s.label[0]}</span>
                        ) : (
                          <Search className="w-3.5 h-3.5" />
                        )}
                      </div>

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium truncate ${isActive ? 'text-green-700' : 'text-gray-900'}`}>
                          <HighlightMatch text={s.label} query={query} />
                        </p>
                        <p className="text-xs text-gray-400">{s.meta}</p>
                      </div>

                      <ArrowUpRight
                        className={`flex-shrink-0 w-3.5 h-3.5 transition-colors ${
                          isActive ? 'text-green-500' : 'text-gray-200 group-hover:text-gray-400'
                        }`}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}

          {/* No results */}
          {showNoResults && (
            <div className="px-5 py-6 text-center">
              <p className="text-sm text-gray-400">
                No results for <span className="font-semibold text-gray-700">"{query}"</span>
              </p>
              <button
                onMouseDown={(e) => e.preventDefault()}
                onClick={handleSubmit as unknown as React.MouseEventHandler}
                className="mt-3 text-sm font-semibold text-green-600 hover:text-green-700 transition-colors"
              >
                Search anyway →
              </button>
            </div>
          )}

          {/* Footer hint */}
          <div className="border-t border-gray-100 px-4 py-2 flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-gray-300" />
            <span className="text-xs text-gray-400">Press Enter to search · ↑↓ to navigate · Esc to close</span>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Highlight matching substring ─────────────────────────────────────────────
function HighlightMatch({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <span className="text-green-600 font-semibold">{text.slice(idx, idx + query.length)}</span>
      {text.slice(idx + query.length)}
    </>
  );
}
