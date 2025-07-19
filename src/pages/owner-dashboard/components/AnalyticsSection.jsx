import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';

const AnalyticsSection = () => {
  const [timeRange, setTimeRange] = useState('month');

  const viewsData = [
    { name: 'Jan', views: 245, inquiries: 12 },
    { name: 'Feb', views: 189, inquiries: 8 },
    { name: 'Mar', views: 312, inquiries: 18 },
    { name: 'Apr', views: 278, inquiries: 15 },
    { name: 'May', views: 356, inquiries: 22 },
    { name: 'Jun', views: 423, inquiries: 28 },
    { name: 'Jul', views: 389, inquiries: 25 }
  ];

  const performanceData = [
    { name: 'Active', value: 65, color: '#10B981' },
    { name: 'Pending', value: 20, color: '#F59E0B' },
    { name: 'Expired', value: 15, color: '#EF4444' }
  ];

  const topProperties = [
    {
      id: 1,
      title: "Premium 3BHK Penthouse",
      views: 312,
      inquiries: 18,
      conversionRate: 5.8,
      trend: 'up'
    },
    {
      id: 2,
      title: "Modern 3BHK Apartment in Bandra",
      views: 245,
      inquiries: 12,
      conversionRate: 4.9,
      trend: 'up'
    },
    {
      id: 3,
      title: "Spacious 4BHK Villa",
      views: 156,
      inquiries: 8,
      conversionRate: 5.1,
      trend: 'stable'
    },
    {
      id: 4,
      title: "Luxury 2BHK with Sea View",
      views: 89,
      inquiries: 5,
      conversionRate: 5.6,
      trend: 'down'
    }
  ];

  const timeRangeOptions = [
    { value: 'week', label: 'Last 7 Days' },
    { value: 'month', label: 'Last 30 Days' },
    { value: 'quarter', label: 'Last 3 Months' },
    { value: 'year', label: 'Last 12 Months' }
  ];

  const suggestions = [
    {
      id: 1,
      type: 'optimization',
      title: "Optimize Property Photos",
      description: "Properties with high-quality photos get 40% more views",
      action: "Upload better photos",
      priority: 'high'
    },
    {
      id: 2,
      type: 'pricing',
      title: "Competitive Pricing",
      description: "Your 3BHK in Bandra is priced 15% above market average",
      action: "Review pricing",
      priority: 'medium'
    },
    {
      id: 3,
      type: 'promotion',
      title: "Promote Top Performer",
      description: "Your penthouse has high engagement - consider promoting it",
      action: "Promote listing",
      priority: 'low'
    }
  ];

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <Icon name="TrendingUp" size={16} className="text-success" />;
      case 'down':
        return <Icon name="TrendingDown" size={16} className="text-error" />;
      default:
        return <Icon name="Minus" size={16} className="text-muted-foreground" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-error bg-error/10';
      case 'medium':
        return 'text-warning bg-warning/10';
      case 'low':
        return 'text-primary bg-primary/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div id="analytics-section" className="space-y-6">
      {/* Analytics Header */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-lg font-semibold text-foreground">Analytics & Insights</h2>
          <Select
            options={timeRangeOptions}
            value={timeRange}
            onChange={setTimeRange}
            className="w-full sm:w-40"
          />
        </div>

        {/* Views and Inquiries Chart */}
        <div className="mb-8">
          <h3 className="text-md font-medium text-foreground mb-4">Views & Inquiries Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={viewsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="name" stroke="#64748B" fontSize={12} />
                <YAxis stroke="#64748B" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }} 
                />
                <Bar dataKey="views" fill="#2563EB" name="Views" radius={[4, 4, 0, 0]} />
                <Bar dataKey="inquiries" fill="#10B981" name="Inquiries" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Property Status Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-md font-medium text-foreground mb-4">Property Status Distribution</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={performanceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {performanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#FFFFFF', 
                      border: '1px solid #E2E8F0',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center space-x-4 mt-4">
              {performanceData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-muted-foreground">{item.name} ({item.value}%)</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Performing Properties */}
          <div>
            <h3 className="text-md font-medium text-foreground mb-4">Top Performing Properties</h3>
            <div className="space-y-3">
              {topProperties.map((property, index) => (
                <div key={property.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-medium text-foreground">#{index + 1}</span>
                      <h4 className="text-sm font-medium text-foreground truncate">
                        {property.title}
                      </h4>
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>{property.views} views</span>
                      <span>{property.inquiries} inquiries</span>
                      <span>{property.conversionRate}% rate</span>
                    </div>
                  </div>
                  {getTrendIcon(property.trend)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Optimization Suggestions */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-card">
        <h3 className="text-md font-medium text-foreground mb-4">Optimization Suggestions</h3>
        <div className="space-y-4">
          {suggestions.map((suggestion) => (
            <div key={suggestion.id} className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg">
              <div className="flex-shrink-0">
                <Icon 
                  name={suggestion.type === 'optimization' ? 'Zap' : suggestion.type === 'pricing' ? 'DollarSign' : 'Star'} 
                  size={20} 
                  className="text-primary" 
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="text-sm font-medium text-foreground">{suggestion.title}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(suggestion.priority)}`}>
                    {suggestion.priority}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{suggestion.description}</p>
                <button className="text-sm text-primary hover:text-primary/80 transition-smooth">
                  {suggestion.action} →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSection;