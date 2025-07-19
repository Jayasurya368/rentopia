import React from 'react';
import Icon from '../../../components/AppIcon';

const FilterChip = ({ label, value, onRemove, className = '' }) => {
  return (
    <div className={`
      inline-flex items-center space-x-2 px-3 py-1.5 
      bg-primary/10 text-primary border border-primary/20 
      rounded-full text-sm font-medium whitespace-nowrap
      ${className}
    `}>
      <span>{label}: {value}</span>
      <button
        onClick={onRemove}
        className="hover:bg-primary/20 rounded-full p-0.5 transition-smooth"
        aria-label={`Remove ${label} filter`}
      >
        <Icon name="X" size={14} />
      </button>
    </div>
  );
};

export default FilterChip;