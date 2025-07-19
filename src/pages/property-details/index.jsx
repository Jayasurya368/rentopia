import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import PropertyImageGallery from './components/PropertyImageGallery';
import PropertyInfo from './components/PropertyInfo';
import AmenitiesSection from './components/AmenitiesSection';
import PropertyMap from './components/PropertyMap';
import OwnerProfile from './components/OwnerProfile';
import SimilarProperties from './components/SimilarProperties';
import StickyActionBar from './components/StickyActionBar';

const PropertyDetails = () => {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const propertyId = searchParams.get('id') || '1';

  // Mock property data
  const mockProperties = [
    {
      id: '1',
      title: 'Spacious 3 BHK Apartment in Bandra West',
      type: 'Apartment',
      bedrooms: 3,
      bathrooms: 2,
      area: 1200,
      rent: 85000,
      deposit: 170000,
      maintenance: 5000,
      address: 'Bandra West, Mumbai, Maharashtra 400050',
      latitude: 19.0596,
      longitude: 72.8295,
      availableFrom: '2025-08-01',
      furnishing: 'Semi-Furnished',
      floor: '5th Floor',
      facing: 'North-East',
      age: 3,
      description: `Beautiful 3 BHK apartment located in the heart of Bandra West. This spacious home features modern amenities, excellent ventilation, and is situated in a well-maintained building with 24/7 security.\n\nThe apartment comes with a modular kitchen, spacious bedrooms with attached bathrooms, and a large living area perfect for families. Located close to shopping centers, restaurants, and excellent connectivity to other parts of Mumbai.`,
      images: [
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop',
      ],
      amenities: [
        'Parking',
        'WiFi',
        'Security',
        'Elevator',
        'Power Backup',
        'Water Supply',
        'Air Conditioning',
        'Balcony',
        'CCTV',
        'Intercom',
        'Maintenance',
        'Gym',
      ],
      owner: {
        id: 'owner1',
        name: 'Rajesh Sharma',
        avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
        verified: true,
        rating: 4.8,
        reviewCount: 24,
        memberSince: '2020-03-15',
        totalProperties: 5,
        responseTime: '2 hours',
        phone: '+91 98765 43210',
        description: 'Experienced property owner with multiple verified listings in Mumbai. Known for quick responses and maintaining properties in excellent condition.',
      },
    },
    {
      id: '2',
      title: 'Modern 2 BHK Flat in Koramangala',
      type: 'Apartment',
      bedrooms: 2,
      bathrooms: 2,
      area: 950,
      rent: 45000,
      deposit: 90000,
      maintenance: 3000,
      address: 'Koramangala, Bangalore, Karnataka 560034',
      latitude: 12.9352,
      longitude: 77.6245,
      availableFrom: '2025-07-25',
      furnishing: 'Fully Furnished',
      floor: '3rd Floor',
      facing: 'South',
      age: 2,
      description: `Contemporary 2 BHK apartment in prime Koramangala location. Perfect for working professionals with modern amenities and excellent connectivity to IT hubs.\n\nFeatures include a fully equipped kitchen, comfortable bedrooms, and a bright living space. The building offers excellent facilities and is located near restaurants, cafes, and shopping areas.`,
      images: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&h=600&fit=crop',
      ],
      amenities: [
        'Parking',
        'WiFi',
        'Security',
        'Elevator',
        'Power Backup',
        'Furnished',
        'Air Conditioning',
        'Balcony',
      ],
      owner: {
        id: 'owner2',
        name: 'Priya Nair',
        avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
        verified: true,
        rating: 4.9,
        reviewCount: 18,
        memberSince: '2021-01-10',
        totalProperties: 3,
        responseTime: '1 hour',
        phone: '+91 87654 32109',
        description: 'Professional property manager specializing in furnished apartments for working professionals.',
      },
    },
    {
      id: '3',
      title: 'Luxury 4 BHK Villa in Gurgaon',
      type: 'Villa',
      bedrooms: 4,
      bathrooms: 4,
      area: 2500,
      rent: 120000,
      deposit: 240000,
      maintenance: 8000,
      address: 'Sector 56, Gurgaon, Haryana 122011',
      latitude: 28.4211,
      longitude: 77.0964,
      availableFrom: '2025-08-15',
      furnishing: 'Semi-Furnished',
      floor: 'Ground Floor',
      facing: 'East',
      age: 1,
      description: `Luxurious 4 BHK villa in premium Gurgaon location. Perfect for families seeking spacious living with modern amenities and excellent connectivity.\n\nFeatures include a private garden, parking for multiple cars, and high-end fittings throughout. Located in a gated community with 24/7 security and recreational facilities.`,
      images: [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
      ],
      amenities: [
        'Parking',
        'WiFi',
        'Security',
        'Garden',
        'Swimming Pool',
        'Gym',
        'Clubhouse',
        'Power Backup',
        'Water Supply',
        'Air Conditioning',
      ],
      owner: {
        id: 'owner3',
        name: 'Amit Gupta',
        avatar: 'https://randomuser.me/api/portraits/men/28.jpg',
        verified: true,
        rating: 4.7,
        reviewCount: 12,
        memberSince: '2022-06-20',
        totalProperties: 2,
        responseTime: '3 hours',
        phone: '+91 76543 21098',
        description: 'Villa owner with premium properties in Gurgaon. Committed to providing excellent living experiences.',
      },
    },
  ];

  useEffect(() => {
    // Simulate API call
    const fetchProperty = () => {
      setLoading(true);
      setTimeout(() => {
        const foundProperty = mockProperties.find(p => p.id === propertyId);
        if (foundProperty) {
          setProperty(foundProperty);
        } else {
          setProperty(mockProperties[0]); // Fallback to first property
        }
        setLoading(false);
      }, 1000);
    };

    fetchProperty();
  }, [propertyId]);

  const handleBackClick = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-64 bg-muted rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-8 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
              <div className="h-32 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <Icon name="Home" size={64} className="text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Property Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The property you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate('/property-search-results')}>
            Browse Properties
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <Helmet>
        <title>{property.title} - Rentopia</title>
        <meta name="description" content={property.description.substring(0, 160)} />
      </Helmet>

      <Header />

      {/* Mobile Header */}
      <div className="md:hidden bg-card border-b border-border p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={handleBackClick}
            className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-smooth"
          >
            <Icon name="ArrowLeft" size={20} />
          </button>
          <h1 className="text-lg font-semibold text-foreground flex-1 mx-4 truncate">
            {property.title}
          </h1>
          <div className="flex items-center space-x-2">
            <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-smooth">
              <Icon name="Share" size={20} />
            </button>
            <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-smooth">
              <Icon name="Heart" size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <PropertyImageGallery 
              images={property.images} 
              propertyTitle={property.title} 
            />

            {/* Property Information */}
            <PropertyInfo property={property} />

            {/* Amenities */}
            <AmenitiesSection amenities={property.amenities} />

            {/* Map */}
            <PropertyMap property={property} />

            {/* Similar Properties - Mobile */}
            <div className="lg:hidden">
              <SimilarProperties 
                properties={mockProperties} 
                currentPropertyId={property.id} 
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Owner Profile */}
            <OwnerProfile owner={property.owner} propertyId={property.id} />

            {/* Similar Properties - Desktop */}
            <div className="hidden lg:block">
              <SimilarProperties 
                properties={mockProperties} 
                currentPropertyId={property.id} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Action Bar */}
      <StickyActionBar property={property} owner={property.owner} />
    </div>
  );
};

export default PropertyDetails;