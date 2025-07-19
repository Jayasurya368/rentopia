import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import FilterChip from './components/FilterChip';
import PropertyCard from './components/PropertyCard';
import FilterPanel from './components/FilterPanel';
import SortDropdown from './components/SortDropdown';
import MapView from './components/MapView';
import NoResults from './components/NoResults';
import LoadingSpinner from './components/LoadingSpinner';

const PropertySearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [filters, setFilters] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    propertyTypes: [],
    bhk: [],
    amenities: [],
    availableFrom: ''
  });
  const [sortBy, setSortBy] = useState('relevance');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'map'
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Mock properties data
  const mockProperties = [
    {
      id: 1,
      title: "Spacious 2BHK Apartment in Bandra West",
      location: "Bandra West, Mumbai, Maharashtra",
      rent: 45000,
      deposit: 90000,
      type: "Apartment",
      bedrooms: 2,
      bathrooms: 2,
      area: 950,
      images: [
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
        "https://images.unsplash.com/photo-1560449752-8d4e8b5c3e5e?w=800",
        "https://images.unsplash.com/photo-1560448075-bb485b067938?w=800"
      ],
      amenities: ["Parking", "Gym", "Security", "Power Backup"],
      owner: { name: "Rajesh Kumar", phone: "+91 98765 43210" },
      availableFrom: "2025-08-01",
      isBookmarked: false,
      postedDate: "2025-07-15"
    },
    {
      id: 2,
      title: "Modern 3BHK Villa with Garden",
      location: "Koramangala, Bangalore, Karnataka",
      rent: 65000,
      deposit: 130000,
      type: "Villa",
      bedrooms: 3,
      bathrooms: 3,
      area: 1400,
      images: [
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800"
      ],
      amenities: ["Parking", "Garden", "Security", "Power Backup", "Swimming Pool"],
      owner: { name: "Priya Sharma", phone: "+91 87654 32109" },
      availableFrom: "2025-07-25",
      isBookmarked: true,
      postedDate: "2025-07-12"
    },
    {
      id: 3,
      title: "Cozy 1BHK Studio Near IT Hub",
      location: "Gurgaon Sector 29, Haryana",
      rent: 28000,
      deposit: 56000,
      type: "Studio",
      bedrooms: 1,
      bathrooms: 1,
      area: 600,
      images: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"
      ],
      amenities: ["Parking", "Gym", "Security", "Lift"],
      owner: { name: "Amit Patel", phone: "+91 76543 21098" },
      availableFrom: "2025-08-15",
      isBookmarked: false,
      postedDate: "2025-07-18"
    },
    {
      id: 4,
      title: "Luxury 4BHK Penthouse with City View",
      location: "Powai, Mumbai, Maharashtra",
      rent: 120000,
      deposit: 240000,
      type: "Penthouse",
      bedrooms: 4,
      bathrooms: 4,
      area: 2200,
      images: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800"
      ],
      amenities: ["Parking", "Gym", "Swimming Pool", "Security", "Power Backup", "Club House"],
      owner: { name: "Neha Gupta", phone: "+91 65432 10987" },
      availableFrom: "2025-09-01",
      isBookmarked: false,
      postedDate: "2025-07-10"
    },
    {
      id: 5,
      title: "Family 3BHK House with Parking",
      location: "Indiranagar, Bangalore, Karnataka",
      rent: 55000,
      deposit: 110000,
      type: "House",
      bedrooms: 3,
      bathrooms: 2,
      area: 1200,
      images: [
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800"
      ],
      amenities: ["Parking", "Garden", "Security"],
      owner: { name: "Suresh Reddy", phone: "+91 54321 09876" },
      availableFrom: "2025-08-10",
      isBookmarked: true,
      postedDate: "2025-07-16"
    },
    {
      id: 6,
      title: "Modern 2BHK with Balcony",
      location: "Andheri East, Mumbai, Maharashtra",
      rent: 38000,
      deposit: 76000,
      type: "Apartment",
      bedrooms: 2,
      bathrooms: 2,
      area: 850,
      images: [
        "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800",
        "https://images.unsplash.com/photo-1560448075-bb485b067938?w=800"
      ],
      amenities: ["Parking", "Lift", "Security", "Power Backup"],
      owner: { name: "Kavita Singh", phone: "+91 43210 98765" },
      availableFrom: "2025-07-30",
      isBookmarked: false,
      postedDate: "2025-07-14"
    }
  ];

  // Initialize search query from URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const query = urlParams.get('q') || '';
    setSearchQuery(query);
  }, [location.search]);

  // Load properties
  useEffect(() => {
    const loadProperties = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProperties(mockProperties);
      setLoading(false);
    };

    loadProperties();
  }, []);

  // Filter and sort properties
  useEffect(() => {
    let filtered = [...properties];

    // Apply search query
    if (searchQuery) {
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply filters
    if (filters.location) {
      filtered = filtered.filter(property =>
        property.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.minPrice) {
      filtered = filtered.filter(property => property.rent >= parseInt(filters.minPrice));
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(property => property.rent <= parseInt(filters.maxPrice));
    }

    if (filters.propertyTypes.length > 0) {
      filtered = filtered.filter(property =>
        filters.propertyTypes.includes(property.type.toLowerCase())
      );
    }

    if (filters.bhk.length > 0) {
      filtered = filtered.filter(property => {
        const bhkStr = property.bedrooms.toString();
        return filters.bhk.includes(bhkStr) || 
               (filters.bhk.includes('5+') && property.bedrooms >= 5);
      });
    }

    if (filters.amenities.length > 0) {
      filtered = filtered.filter(property =>
        filters.amenities.every(amenity => property.amenities.includes(amenity))
      );
    }

    if (filters.availableFrom) {
      filtered = filtered.filter(property =>
        new Date(property.availableFrom) <= new Date(filters.availableFrom)
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.rent - b.rent);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.rent - a.rent);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
        break;
      case 'distance':
        // Mock distance sorting
        filtered.sort((a, b) => a.id - b.id);
        break;
      default:
        // Relevance - keep original order
        break;
    }

    setFilteredProperties(filtered);
  }, [properties, searchQuery, filters, sortBy]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    navigate(`/property-search-results?q=${encodeURIComponent(query)}`);
  };

  const handleBookmark = (propertyId) => {
    setProperties(prev => prev.map(property =>
      property.id === propertyId
        ? { ...property, isBookmarked: !property.isBookmarked }
        : property
    ));
  };

  const handleContactOwner = (property) => {
    navigate(`/real-time-chat-interface?ownerId=${property.owner.name}&propertyId=${property.id}`);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const getActiveFilters = () => {
    const activeFilters = [];
    
    if (filters.location) {
      activeFilters.push({ key: 'location', label: 'Location', value: filters.location });
    }
    
    if (filters.minPrice || filters.maxPrice) {
      const priceRange = `₹${filters.minPrice || '0'} - ₹${filters.maxPrice || '∞'}`;
      activeFilters.push({ key: 'price', label: 'Price', value: priceRange });
    }
    
    if (filters.propertyTypes.length > 0) {
      activeFilters.push({ 
        key: 'propertyTypes', 
        label: 'Type', 
        value: filters.propertyTypes.join(', ') 
      });
    }
    
    if (filters.bhk.length > 0) {
      activeFilters.push({ 
        key: 'bhk', 
        label: 'BHK', 
        value: filters.bhk.join(', ') + ' BHK' 
      });
    }
    
    if (filters.amenities.length > 0) {
      activeFilters.push({ 
        key: 'amenities', 
        label: 'Amenities', 
        value: `${filters.amenities.length} selected` 
      });
    }

    return activeFilters;
  };

  const removeFilter = (filterKey) => {
    const newFilters = { ...filters };
    
    switch (filterKey) {
      case 'location':
        newFilters.location = '';
        break;
      case 'price':
        newFilters.minPrice = '';
        newFilters.maxPrice = '';
        break;
      case 'propertyTypes':
        newFilters.propertyTypes = [];
        break;
      case 'bhk':
        newFilters.bhk = [];
        break;
      case 'amenities':
        newFilters.amenities = [];
        break;
      default:
        break;
    }
    
    setFilters(newFilters);
  };

  const clearAllFilters = () => {
    setFilters({
      location: '',
      minPrice: '',
      maxPrice: '',
      propertyTypes: [],
      bhk: [],
      amenities: [],
      availableFrom: ''
    });
  };

  const handleBroaderSearch = (area = '') => {
    if (area) {
      setSearchQuery(area);
      navigate(`/property-search-results?q=${encodeURIComponent(area)}`);
    } else {
      clearAllFilters();
      setSearchQuery('');
      navigate('/property-search-results');
    }
  };

  const loadMoreProperties = useCallback(async () => {
    if (loadingMore || !hasMore) return;
    
    setLoadingMore(true);
    // Simulate loading more properties
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo, we'll just set hasMore to false after first load
    setHasMore(false);
    setLoadingMore(false);
  }, [loadingMore, hasMore]);

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        >= document.documentElement.offsetHeight - 1000
      ) {
        loadMoreProperties();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMoreProperties]);

  const activeFilters = getActiveFilters();

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <LoadingSpinner size="lg" className="py-20" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* Search Header */}
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search by location, property type, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="pl-10 pr-10"
                />
                <Icon
                  name="Search"
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      navigate('/property-search-results');
                    }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
                  >
                    <Icon name="X" size={16} />
                  </button>
                )}
              </div>
            </div>
            
            <Button
              variant="default"
              onClick={() => handleSearch(searchQuery)}
              iconName="Search"
              iconSize={16}
            >
              Search
            </Button>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              {filteredProperties.length} properties found
              {searchQuery && ` for "${searchQuery}"`}
            </p>
            
            <div className="flex items-center space-x-2">
              {/* View Toggle */}
              <div className="flex items-center bg-muted rounded-md p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-smooth ${
                    viewMode === 'grid' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name="Grid3X3" size={16} />
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`p-2 rounded transition-smooth ${
                    viewMode === 'map' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name="Map" size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-sm font-medium text-foreground">Active Filters:</span>
              <button
                onClick={clearAllFilters}
                className="text-sm text-primary hover:underline"
              >
                Clear All
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {activeFilters.map((filter) => (
                <FilterChip
                  key={filter.key}
                  label={filter.label}
                  value={filter.value}
                  onRemove={() => removeFilter(filter.key)}
                />
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-6">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-24">
              <FilterPanel
                filters={filters}
                onFiltersChange={handleFiltersChange}
                isOpen={true}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls Bar */}
            <div className="flex items-center justify-between mb-6">
              <Button
                variant="outline"
                onClick={() => setShowFilters(true)}
                iconName="Filter"
                iconSize={16}
                className="lg:hidden"
              >
                Filters
              </Button>
              
              <SortDropdown
                value={sortBy}
                onChange={setSortBy}
              />
            </div>

            {/* Content Area */}
            {viewMode === 'grid' ? (
              <>
                {filteredProperties.length > 0 ? (
                  <>
                    {/* Property Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                      {filteredProperties.map((property) => (
                        <PropertyCard
                          key={property.id}
                          property={property}
                          onBookmark={handleBookmark}
                          onContactOwner={handleContactOwner}
                        />
                      ))}
                    </div>

                    {/* Load More */}
                    {loadingMore && (
                      <LoadingSpinner className="py-8" />
                    )}
                  </>
                ) : (
                  <NoResults
                    searchQuery={searchQuery}
                    onClearFilters={clearAllFilters}
                    onBroaderSearch={handleBroaderSearch}
                  />
                )}
              </>
            ) : (
              /* Map View */
              <div className="h-96 lg:h-[600px]">
                <MapView
                  properties={filteredProperties}
                  onPropertySelect={(property) => navigate(`/property-details?id=${property.id}`)}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setShowFilters(false)} />
          <div className="absolute bottom-0 left-0 right-0 max-h-[80vh] overflow-hidden">
            <FilterPanel
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClose={() => setShowFilters(false)}
              isOpen={showFilters}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertySearchResults;