import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Input from './Input';

const NavigationSearch = ({ className = '', onSearch, placeholder = "Search properties..." }) => {
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  // Mock suggestions data
  const mockSuggestions = [
    { id: 1, text: 'Mumbai, Maharashtra', type: 'location' },
    { id: 2, text: 'Bangalore, Karnataka', type: 'location' },
    { id: 3, text: 'Delhi, NCR', type: 'location' },
    { id: 4, text: '2 BHK Apartment', type: 'property' },
    { id: 5, text: '3 BHK Villa', type: 'property' },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowSuggestions(false);
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 0) {
      const filtered = mockSuggestions.filter(suggestion =>
        suggestion.text.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearch = (searchQuery = query) => {
    if (searchQuery.trim()) {
      if (onSearch) {
        onSearch(searchQuery);
      } else {
        navigate(`/property-search-results?q=${encodeURIComponent(searchQuery)}`);
      }
      setShowSuggestions(false);
      setIsExpanded(false);
      inputRef.current?.blur();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
    if (e.key === 'Escape') {
      setShowSuggestions(false);
      setIsExpanded(false);
      inputRef.current?.blur();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.text);
    handleSearch(suggestion.text);
  };

  const handleFocus = () => {
    setIsExpanded(true);
    if (query.length > 0) {
      setShowSuggestions(true);
    }
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className={`
        relative transition-all duration-300 ease-in-out
        ${isExpanded ? 'w-80' : 'w-64'}
      `}>
        <div className="relative">
          <Input
            ref={inputRef}
            type="search"
            placeholder={placeholder}
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            onFocus={handleFocus}
            className="pl-10 pr-10"
          />
          <Icon
            name="Search"
            size={16}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                setSuggestions([]);
                setShowSuggestions(false);
                inputRef.current?.focus();
              }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
            >
              <Icon name="X" size={16} />
            </button>
          )}
        </div>

        {/* Search Suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-md shadow-modal z-50 max-h-60 overflow-y-auto">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full px-4 py-3 text-left hover:bg-muted transition-smooth flex items-center space-x-3 border-b border-border last:border-b-0"
              >
                <Icon
                  name={suggestion.type === 'location' ? 'MapPin' : 'Home'}
                  size={16}
                  className="text-muted-foreground"
                />
                <div className="flex-1">
                  <span className="text-sm text-foreground">{suggestion.text}</span>
                  <span className="text-xs text-muted-foreground ml-2 capitalize">
                    {suggestion.type}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NavigationSearch;