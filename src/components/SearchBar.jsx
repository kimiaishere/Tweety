// components/SearchBar.jsx (نسخه بدون absolute)
import React, { useState, useEffect, useRef } from 'react';
import { useDebounce } from '../Hooks/useDebounce';

export default function SearchBar({ onSearchResult }) {
  const [term, setTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [show, setShow] = useState(false);
  const ref = useRef(null);

  const debouncedTerm = useDebounce(term, 300);

  useEffect(() => {
    const clickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setShow(false);
      }
    };
    document.addEventListener('mousedown', clickOutside);
    return () => document.removeEventListener('mousedown', clickOutside);
  }, []);

  useEffect(() => {
    if (debouncedTerm.length < 3) {
      setSuggestions([]);
      setShow(false);
      onSearchResult('');
      return;
    }

    const search = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/posts?title_like=${debouncedTerm}`
        );
        const data = await res.json();
        const titles = [...new Set(data.map(item => item.title))].slice(0, 10);
        setSuggestions(titles);
        setShow(true);
      } catch (error) {
        console.error('Search error:', error);
        setSuggestions([]);
      }
    };

    search();
  }, [debouncedTerm, onSearchResult]);

  const handleSelect = (title) => {
    setTerm(title);
    setShow(false);
    onSearchResult(title);
  };

  return (
    <div ref={ref} className="flex-1 max-w-lg">
      <div>
        <div className="flex items-center relative">
          <input
            type="text"
            placeholder="جستجو در عنوان پست‌ها..."
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            onFocus={() => debouncedTerm.length >= 3 && setShow(true)}
            className="w-full px-4 py-2.5 pr-10 bg-gray-50 rounded-full border border-gray-200 focus:outline-none focus:bg-white focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all text-sm placeholder:text-gray-400"
          />
          
          {/* آیکون جستجو */}
          <div className="absolute right-3 pointer-events-none">
            <svg 
              className="w-5 h-5 text-gray-400"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* دکمه clear */}
          {term && (
            <button
              onClick={() => {
                setTerm('');
                setSuggestions([]);
                setShow(false);
                onSearchResult('');
              }}
              className="absolute left-3 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* لیست پیشنهادات - بدون absolute */}
        {show && (
          <div className="mt-2 bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 overflow-hidden">
            {suggestions.length === 0 ? (
              <div className="px-4 py-3 text-gray-400 text-sm">نتیجه‌ای یافت نشد</div>
            ) : (
              <ul className="max-h-80 overflow-y-auto">
                {suggestions.map((title, i) => (
                  <li
                    key={i}
                    onClick={() => handleSelect(title)}
                    className="px-4 py-3 hover:bg-sky-50 cursor-pointer transition-colors border-b border-gray-50 last:border-0 flex items-center gap-3"
                  >
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span className="text-sm text-gray-800">{title}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}