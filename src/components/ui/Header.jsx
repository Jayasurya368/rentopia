import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    // Simulate user authentication check
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Simulate unread message count
    setUnreadCount(3);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    closeMenu();
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const getNavigationItems = () => {
    if (!user) {
      return [
        { label: 'Browse Properties', path: '/property-search-results', icon: 'Search' },
        { label: 'Login', path: '/user-authentication-login-register', icon: 'LogIn' },
      ];
    }

    const baseItems = [
      { 
        label: user.role === 'owner' ? 'My Listings' : 'Browse Properties', 
        path: user.role === 'owner' ? '/property-search-results' : '/property-search-results', 
        icon: user.role === 'owner' ? 'Building' : 'Search' 
      },
      { 
        label: 'Messages', 
        path: '/real-time-chat-interface', 
        icon: 'MessageCircle',
        badge: unreadCount > 0 ? unreadCount : null
      },
      { 
        label: user.role === 'owner' ? 'Dashboard' : 'Favorites', 
        path: user.role === 'owner' ? '/owner-dashboard' : '/owner-dashboard', 
        icon: user.role === 'owner' ? 'LayoutDashboard' : 'Heart' 
      },
    ];

    if (user.role === 'owner') {
      baseItems.splice(2, 0, {
        label: 'Add Listing',
        path: '/property-listing-creation',
        icon: 'Plus'
      });
    }

    return baseItems;
  };

  const navigationItems = getNavigationItems();

  return (
    <header className="sticky top-0 z-50 w-full bg-card border-b border-border shadow-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-smooth">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Home" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold text-foreground">Rentopia</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                  isActive(item.path)
                    ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item.icon} size={16} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
            
            {user && (
              <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-border">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="User" size={16} color="white" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{user.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  iconName="LogOut"
                  iconSize={14}
                >
                  Logout
                </Button>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
          >
            <Icon name={isMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-card border-t border-border shadow-modal">
          <nav className="px-4 py-4 space-y-2">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeMenu}
                className={`relative flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-medium transition-smooth ${
                  isActive(item.path)
                    ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item.icon} size={18} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="ml-auto bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
            
            {user && (
              <div className="pt-4 mt-4 border-t border-border">
                <div className="flex items-center space-x-3 px-3 py-2 mb-2">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="User" size={16} color="white" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{user.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  iconName="LogOut"
                  iconSize={14}
                  fullWidth
                  className="justify-start"
                >
                  Logout
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;