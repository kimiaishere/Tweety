import React, { useState, useEffect, useRef } from "react";
import { useDebounce } from "../Hooks/useDebounce";
import MixedText from "./MixedText";

export default function SearchBar({ onSearchResult }) {
  const [term, setTerm] = useState("");
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
    document.addEventListener("mousedown", clickOutside);
    return () => document.removeEventListener("mousedown", clickOutside);
  }, []);

  useEffect(() => {
    if (debouncedTerm.length < 2) {
      setSuggestions([]);
      setShow(false);
      onSearchResult("");
      return;
    }

    const search = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/posts?title_like=${debouncedTerm}`
        );
        const data = await res.json();
        const titles = [...new Set(data.map((item) => item.title))].slice(0, 8);
        setSuggestions(titles);
        setShow(true);
      } catch {
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

  const handleClear = () => {
    setTerm("");
    setSuggestions([]);
    setShow(false);
    onSearchResult("");
  };

  return (
    <div className="relative flex-1 max-w-3xl" ref={ref}>
      <div className="relative">
        <input
          type="text"
          placeholder="جستجو در توییت‌ها..."
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          onFocus={() => debouncedTerm.length >= 2 && setShow(true)}
          className="w-full px-4 py-2.5 pr-10 pl-9 rounded-full bg-gray-100 border border-transparent focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm placeholder:text-gray-400"
        />

        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {term && (
          <button
            onClick={handleClear}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {show && (
        <div className="absolute mt-1.5 w-full bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-30 animate-slide-up">
          {suggestions.length === 0 ? (
            <div className="px-4 py-3 text-gray-400 text-sm text-center">
              نتیجه‌ای یافت نشد
            </div>
          ) : (
            <ul className="max-h-64 overflow-y-auto">
              {suggestions.map((title, i) => (
                <li
                  key={i}
                  onClick={() => handleSelect(title)}
                  className="px-4 py-2.5 hover:bg-brand-50 cursor-pointer transition-colors flex items-center gap-2.5 text-sm"
                >
                  <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span className="text-gray-700 truncate">
                    <MixedText>{title}</MixedText>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
