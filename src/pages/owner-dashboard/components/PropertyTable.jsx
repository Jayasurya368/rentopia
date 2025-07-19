import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const PropertyTable = () => {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState('date');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showDropdown, setShowDropdown] = useState(null);

  const properties = [
    {
      id: 1,
      title: "Modern 3BHK Apartment in Bandra",
      location: "Bandra West, Mumbai",
      rent: 85000,
      status: "active",
      views: 245,
      inquiries: 12,
      dateCreated: "2025-01-15",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400"
    },
    {
      id: 2,
      title: "Luxury 2BHK with Sea View",
      location: "Marine Drive, Mumbai",
      rent: 120000,
      status: "pending",
      views: 89,
      inquiries: 5,
      dateCreated: "2025-01-10",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400"
    },
    {
      id: 3,
      title: "Spacious 4BHK Villa",
      location: "Juhu, Mumbai",
      rent: 200000,
      status: "active",
      views: 156,
      inquiries: 8,
      dateCreated: "2025-01-05",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400"
    },
    {
      id: 4,
      title: "Cozy 1BHK Studio",
      location: "Andheri East, Mumbai",
      rent: 35000,
      status: "expired",
      views: 67,
      inquiries: 3,
      dateCreated: "2024-12-20",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400"
    },
    {
      id: 5,
      title: "Premium 3BHK Penthouse",
      location: "Powai, Mumbai",
      rent: 150000,
      status: "active",
      views: 312,
      inquiries: 18,
      dateCreated: "2025-01-12",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400"
    }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'pending', label: 'Pending' },
    { value: 'expired', label: 'Expired' }
  ];

  const sortOptions = [
    { value: 'date', label: 'Date Created' },
    { value: 'views', label: 'Most Views' },
    { value: 'inquiries', label: 'Most Inquiries' },
    { value: 'rent', label: 'Rent Amount' }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'text-success bg-success/10', label: 'Active' },
      pending: { color: 'text-warning bg-warning/10', label: 'Pending' },
      expired: { color: 'text-error bg-error/10', label: 'Expired' }
    };

    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const handleAction = (action, propertyId) => {
    setShowDropdown(null);
    
    switch (action) {
      case 'edit':
        navigate(`/property-listing-creation?edit=${propertyId}`);
        break;
      case 'view':
        navigate(`/property-details?id=${propertyId}`);
        break;
      case 'promote':
        // Handle promote action
        console.log('Promote property:', propertyId);
        break;
      case 'pause':
        // Handle pause action
        console.log('Pause property:', propertyId);
        break;
      case 'delete':
        // Handle delete action
        console.log('Delete property:', propertyId);
        break;
      default:
        break;
    }
  };

  const filteredProperties = properties.filter(property => 
    filterStatus === 'all' || property.status === filterStatus
  );

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case 'views':
        return b.views - a.views;
      case 'inquiries':
        return b.inquiries - a.inquiries;
      case 'rent':
        return b.rent - a.rent;
      case 'date':
      default:
        return new Date(b.dateCreated) - new Date(a.dateCreated);
    }
  });

  return (
    <div id="properties-section" className="bg-card border border-border rounded-lg shadow-card">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-lg font-semibold text-foreground">Property Listings</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <Select
              options={statusOptions}
              value={filterStatus}
              onChange={setFilterStatus}
              placeholder="Filter by status"
              className="w-full sm:w-40"
            />
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={setSortBy}
              placeholder="Sort by"
              className="w-full sm:w-40"
            />
          </div>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Property</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Location</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Rent</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Views</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Inquiries</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedProperties.map((property) => (
              <tr key={property.id} className="border-b border-border hover:bg-muted/30 transition-smooth">
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-medium text-foreground text-sm">{property.title}</h3>
                      <p className="text-xs text-muted-foreground">Created: {property.dateCreated}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-sm text-muted-foreground">{property.location}</td>
                <td className="p-4 text-sm font-medium text-foreground">₹{property.rent.toLocaleString('en-IN')}</td>
                <td className="p-4">{getStatusBadge(property.status)}</td>
                <td className="p-4 text-sm text-muted-foreground">{property.views}</td>
                <td className="p-4 text-sm text-muted-foreground">{property.inquiries}</td>
                <td className="p-4">
                  <div className="relative">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowDropdown(showDropdown === property.id ? null : property.id)}
                      iconName="MoreVertical"
                      iconSize={16}
                    />
                    {showDropdown === property.id && (
                      <div className="absolute right-0 top-8 bg-popover border border-border rounded-md shadow-modal z-10 min-w-32">
                        <button
                          onClick={() => handleAction('view', property.id)}
                          className="w-full px-3 py-2 text-left text-sm hover:bg-muted transition-smooth flex items-center space-x-2"
                        >
                          <Icon name="Eye" size={14} />
                          <span>View</span>
                        </button>
                        <button
                          onClick={() => handleAction('edit', property.id)}
                          className="w-full px-3 py-2 text-left text-sm hover:bg-muted transition-smooth flex items-center space-x-2"
                        >
                          <Icon name="Edit" size={14} />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleAction('promote', property.id)}
                          className="w-full px-3 py-2 text-left text-sm hover:bg-muted transition-smooth flex items-center space-x-2"
                        >
                          <Icon name="Star" size={14} />
                          <span>Promote</span>
                        </button>
                        <button
                          onClick={() => handleAction('pause', property.id)}
                          className="w-full px-3 py-2 text-left text-sm hover:bg-muted transition-smooth flex items-center space-x-2"
                        >
                          <Icon name="Pause" size={14} />
                          <span>Pause</span>
                        </button>
                        <button
                          onClick={() => handleAction('delete', property.id)}
                          className="w-full px-3 py-2 text-left text-sm hover:bg-muted transition-smooth flex items-center space-x-2 text-error"
                        >
                          <Icon name="Trash2" size={14} />
                          <span>Delete</span>
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden p-4 space-y-4">
        {sortedProperties.map((property) => (
          <div key={property.id} className="border border-border rounded-lg p-4">
            <div className="flex items-start space-x-3 mb-3">
              <img
                src={property.image}
                alt={property.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-medium text-foreground text-sm mb-1">{property.title}</h3>
                <p className="text-xs text-muted-foreground mb-2">{property.location}</p>
                {getStatusBadge(property.status)}
              </div>
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowDropdown(showDropdown === property.id ? null : property.id)}
                  iconName="MoreVertical"
                  iconSize={16}
                />
                {showDropdown === property.id && (
                  <div className="absolute right-0 top-8 bg-popover border border-border rounded-md shadow-modal z-10 min-w-32">
                    <button
                      onClick={() => handleAction('view', property.id)}
                      className="w-full px-3 py-2 text-left text-sm hover:bg-muted transition-smooth flex items-center space-x-2"
                    >
                      <Icon name="Eye" size={14} />
                      <span>View</span>
                    </button>
                    <button
                      onClick={() => handleAction('edit', property.id)}
                      className="w-full px-3 py-2 text-left text-sm hover:bg-muted transition-smooth flex items-center space-x-2"
                    >
                      <Icon name="Edit" size={14} />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleAction('promote', property.id)}
                      className="w-full px-3 py-2 text-left text-sm hover:bg-muted transition-smooth flex items-center space-x-2"
                    >
                      <Icon name="Star" size={14} />
                      <span>Promote</span>
                    </button>
                    <button
                      onClick={() => handleAction('pause', property.id)}
                      className="w-full px-3 py-2 text-left text-sm hover:bg-muted transition-smooth flex items-center space-x-2"
                    >
                      <Icon name="Pause" size={14} />
                      <span>Pause</span>
                    </button>
                    <button
                      onClick={() => handleAction('delete', property.id)}
                      className="w-full px-3 py-2 text-left text-sm hover:bg-muted transition-smooth flex items-center space-x-2 text-error"
                    >
                      <Icon name="Trash2" size={14} />
                      <span>Delete</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-lg font-semibold text-foreground">₹{property.rent.toLocaleString('en-IN')}</p>
                <p className="text-xs text-muted-foreground">Monthly Rent</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-foreground">{property.views}</p>
                <p className="text-xs text-muted-foreground">Views</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-foreground">{property.inquiries}</p>
                <p className="text-xs text-muted-foreground">Inquiries</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {sortedProperties.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="Home" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No Properties Found</h3>
          <p className="text-muted-foreground mb-4">
            {filterStatus === 'all' ? "You haven't listed any properties yet." 
              : `No properties found with status: ${filterStatus}`
            }
          </p>
          <Button
            variant="default"
            onClick={() => navigate('/property-listing-creation')}
            iconName="Plus"
            iconPosition="left"
          >
            Add Your First Property
          </Button>
        </div>
      )}
    </div>
  );
};

export default PropertyTable;