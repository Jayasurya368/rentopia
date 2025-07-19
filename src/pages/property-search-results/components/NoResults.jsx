import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NoResults = ({ searchQuery, onClearFilters, onBroaderSearch, className = '' }) => {
  const suggestions = [
    "Try searching in nearby areas",
    "Increase your budget range",
    "Consider different property types",
    "Remove some amenity filters",
    "Check availability dates"
  ];

  const popularAreas = [
    "Bandra West, Mumbai",
    "Koramangala, Bangalore",
    "Gurgaon Sector 29",
    "Powai, Mumbai",
    "Indiranagar, Bangalore"
  ];

  return (
    <div className={`text-center py-12 px-4 ${className}`}>
      <div className="max-w-md mx-auto">
        {/* No Results Icon */}
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="SearchX" size={48} className="text-muted-foreground" />
        </div>

        {/* Main Message */}
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          No Properties Found
        </h2>
        
        {searchQuery && (
          <p className="text-muted-foreground mb-6">
            We couldn't find any properties matching "{searchQuery}" with your current filters.
          </p>
        )}

        {/* Suggestions */}
        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <h3 className="text-lg font-medium text-foreground mb-4">
            Try these suggestions:
          </h3>
          <ul className="space-y-2 text-left">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start space-x-2">
                <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <Button
            variant="outline"
            onClick={onClearFilters}
            iconName="RotateCcw"
            iconSize={16}
            className="flex-1"
          >
            Clear All Filters
          </Button>
          <Button
            variant="default"
            onClick={onBroaderSearch}
            iconName="Search"
            iconSize={16}
            className="flex-1"
          >
            Broader Search
          </Button>
        </div>

        {/* Popular Areas */}
        <div className="text-left">
          <h4 className="text-sm font-medium text-foreground mb-3">
            Popular areas you might like:
          </h4>
          <div className="flex flex-wrap gap-2">
            {popularAreas.map((area, index) => (
              <button
                key={index}
                onClick={() => onBroaderSearch(area)}
                className="px-3 py-1.5 bg-muted text-muted-foreground text-sm rounded-full hover:bg-primary hover:text-primary-foreground transition-smooth"
              >
                {area}
              </button>
            ))}
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Need help finding the right property?{' '}
            <button className="text-primary hover:underline">
              Contact our support team
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoResults;