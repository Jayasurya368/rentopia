import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import MetricsCard from './components/MetricsCard';
import QuickActions from './components/QuickActions';
import PropertyTable from './components/PropertyTable';
import RecentInquiries from './components/RecentInquiries';
import RevenueSection from './components/RevenueSection';
import AnalyticsSection from './components/AnalyticsSection';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication and user role
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/user-authentication-login-register');
      return;
    }

    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== 'owner') {
      navigate('/property-search-results');
      return;
    }

    setUser(parsedUser);
    setLoading(false);
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  const dashboardMetrics = [
    {
      title: "Total Properties",
      value: "5",
      icon: "Home",
      trend: "up",
      trendValue: "+2 this month",
      color: "primary"
    },
    {
      title: "Active Inquiries",
      value: "23",
      icon: "MessageCircle",
      trend: "up",
      trendValue: "+8 this week",
      color: "success"
    },
    {
      title: "Monthly Views",
      value: "1,247",
      icon: "Eye",
      trend: "up",
      trendValue: "+15% vs last month",
      color: "accent"
    },
    {
      title: "Revenue (Premium)",
      value: "₹2,000",
      icon: "TrendingUp",
      trend: "up",
      trendValue: "+₹500 this month",
      color: "warning"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-foreground mb-2">
                Welcome back, {user?.name || 'Property Owner'}!
              </h1>
              <p className="text-muted-foreground">
                Here's what's happening with your properties today.
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => navigate('/real-time-chat-interface')}
                iconName="MessageCircle"
                iconPosition="left"
              >
                Messages
              </Button>
              <Button
                variant="default"
                onClick={() => navigate('/property-listing-creation')}
                iconName="Plus"
                iconPosition="left"
              >
                Add Property
              </Button>
            </div>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardMetrics.map((metric, index) => (
            <MetricsCard
              key={index}
              title={metric.title}
              value={metric.value}
              icon={metric.icon}
              trend={metric.trend}
              trendValue={metric.trendValue}
              color={metric.color}
            />
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <QuickActions />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
          {/* Property Management - Takes 2 columns on xl screens */}
          <div className="xl:col-span-2">
            <PropertyTable />
          </div>

          {/* Recent Inquiries - Takes 1 column on xl screens */}
          <div className="xl:col-span-1">
            <RecentInquiries />
          </div>
        </div>

        {/* Revenue Section */}
        <div className="mb-8">
          <RevenueSection />
        </div>

        {/* Analytics Section */}
        <div className="mb-8">
          <AnalyticsSection />
        </div>

        {/* Help & Support Section */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-card">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 text-primary p-3 rounded-lg">
                <Icon name="HelpCircle" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground mb-1">Need Help?</h3>
                <p className="text-muted-foreground">
                  Get support with property management, payments, or platform features.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                iconName="Book"
                iconPosition="left"
              >
                View Guide
              </Button>
              <Button
                variant="outline"
                iconName="MessageCircle"
                iconPosition="left"
              >
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Home" size={16} color="white" />
              </div>
              <span className="text-lg font-semibold text-foreground">Rentopia</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Rentopia. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OwnerDashboard;