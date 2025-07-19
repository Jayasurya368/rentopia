import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const RevenueSection = () => {
  const [timeFilter, setTimeFilter] = useState('month');

  const transactions = [
    {
      id: 1,
      type: 'premium_listing',
      propertyTitle: "Modern 3BHK Apartment in Bandra",
      amount: 500,
      status: 'completed',
      date: new Date('2025-01-15'),
      transactionId: 'TXN001234567'
    },
    {
      id: 2,
      type: 'premium_listing',
      propertyTitle: "Luxury 2BHK with Sea View",
      amount: 500,
      status: 'completed',
      date: new Date('2025-01-10'),
      transactionId: 'TXN001234568'
    },
    {
      id: 3,
      type: 'premium_listing',
      propertyTitle: "Premium 3BHK Penthouse",
      amount: 500,
      status: 'pending',
      date: new Date('2025-01-12'),
      transactionId: 'TXN001234569'
    },
    {
      id: 4,
      type: 'premium_listing',
      propertyTitle: "Spacious 4BHK Villa",
      amount: 500,
      status: 'completed',
      date: new Date('2025-01-05'),
      transactionId: 'TXN001234570'
    }
  ];

  const timeFilterOptions = [
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { color: 'text-success bg-success/10', label: 'Completed', icon: 'CheckCircle' },
      pending: { color: 'text-warning bg-warning/10', label: 'Pending', icon: 'Clock' },
      failed: { color: 'text-error bg-error/10', label: 'Failed', icon: 'XCircle' }
    };

    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        <Icon name={config.icon} size={12} />
        <span>{config.label}</span>
      </span>
    );
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const totalRevenue = transactions
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const pendingRevenue = transactions
    .filter(t => t.status === 'pending')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div id="revenue-section" className="bg-card border border-border rounded-lg shadow-card">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-lg font-semibold text-foreground">Revenue & Payments</h2>
          <Select
            options={timeFilterOptions}
            value={timeFilter}
            onChange={setTimeFilter}
            className="w-full sm:w-40"
          />
        </div>
      </div>

      {/* Revenue Summary */}
      <div className="p-6 border-b border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-success/10 text-success p-3 rounded-lg w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <Icon name="TrendingUp" size={24} />
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-1">₹{totalRevenue.toLocaleString('en-IN')}</h3>
            <p className="text-sm text-muted-foreground">Total Revenue</p>
          </div>
          
          <div className="text-center">
            <div className="bg-warning/10 text-warning p-3 rounded-lg w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <Icon name="Clock" size={24} />
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-1">₹{pendingRevenue.toLocaleString('en-IN')}</h3>
            <p className="text-sm text-muted-foreground">Pending Payments</p>
          </div>
          
          <div className="text-center">
            <div className="bg-primary/10 text-primary p-3 rounded-lg w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <Icon name="CreditCard" size={24} />
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-1">{transactions.length}</h3>
            <p className="text-sm text-muted-foreground">Total Transactions</p>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="p-6">
        <h3 className="text-md font-medium text-foreground mb-4">Recent Transactions</h3>
        
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 text-sm font-medium text-muted-foreground">Property</th>
                <th className="text-left py-3 text-sm font-medium text-muted-foreground">Amount</th>
                <th className="text-left py-3 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left py-3 text-sm font-medium text-muted-foreground">Date</th>
                <th className="text-left py-3 text-sm font-medium text-muted-foreground">Transaction ID</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-border hover:bg-muted/30 transition-smooth">
                  <td className="py-3">
                    <div>
                      <p className="text-sm font-medium text-foreground">{transaction.propertyTitle}</p>
                      <p className="text-xs text-muted-foreground">Premium Listing</p>
                    </div>
                  </td>
                  <td className="py-3 text-sm font-medium text-foreground">
                    ₹{transaction.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3">
                    {getStatusBadge(transaction.status)}
                  </td>
                  <td className="py-3 text-sm text-muted-foreground">
                    {formatDate(transaction.date)}
                  </td>
                  <td className="py-3 text-sm text-muted-foreground font-mono">
                    {transaction.transactionId}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="border border-border rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-foreground mb-1">
                    {transaction.propertyTitle}
                  </h4>
                  <p className="text-xs text-muted-foreground">Premium Listing</p>
                </div>
                {getStatusBadge(transaction.status)}
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Amount</p>
                  <p className="font-medium text-foreground">₹{transaction.amount.toLocaleString('en-IN')}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Date</p>
                  <p className="font-medium text-foreground">{formatDate(transaction.date)}</p>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t border-border">
                <p className="text-xs text-muted-foreground">Transaction ID</p>
                <p className="text-xs font-mono text-foreground">{transaction.transactionId}</p>
              </div>
            </div>
          ))}
        </div>

        {transactions.length === 0 && (
          <div className="text-center py-8">
            <Icon name="CreditCard" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No Transactions Yet</h3>
            <p className="text-muted-foreground mb-4">
              Your premium listing payments and revenue will appear here.
            </p>
            <Button
              variant="outline"
              iconName="Star"
              iconPosition="left"
            >
              Promote a Listing
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RevenueSection;