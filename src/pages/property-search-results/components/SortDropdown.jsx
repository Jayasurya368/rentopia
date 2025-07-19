import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SortDropdown = ({ value, onChange, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest Listings' },
    { value: 'distance', label: 'Distance' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = sortOptions.find(option => option.value === value) || sortOptions[0];

  const handleOptionSelect = (option) => {
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-card border border-border rounded-md text-sm font-medium text-foreground hover:bg-muted transition-smooth"
      >
        <span>Sort: {selectedOption.label}</span>
        <Icon 
          name={isOpen ? "ChevronUp" : "ChevronDown"} 
          size={16} 
          className="text-muted-foreground"
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-48 bg-popover border border-border rounded-md shadow-modal z-50">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleOptionSelect(option)}
              className={`w-full px-4 py-3 text-left text-sm hover:bg-muted transition-smooth border-b border-border last:border-b-0 ${
                option.value === value 
                  ? 'text-primary bg-primary/10' :'text-foreground'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortDropdown;