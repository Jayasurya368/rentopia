import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PaymentModal = ({ isOpen, onClose, onPaymentSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [processing, setProcessing] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  const handlePayment = async () => {
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      onPaymentSuccess();
      onClose();
    }, 2000);
  };

  const handleCardChange = (field, value) => {
    setCardDetails(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-modal w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">
            Complete Payment
          </h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-smooth"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="p-6">
          {/* Payment Amount */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">
                Additional Listing Fee
              </p>
              <p className="text-2xl font-bold text-primary">₹500</p>
              <p className="text-xs text-muted-foreground mt-1">
                Your first listing is free. This fee applies to additional listings.
              </p>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="mb-6">
            <h3 className="font-semibold text-foreground mb-3">Payment Method</h3>
            <div className="space-y-3">
              <label className="flex items-center p-3 border border-border rounded-lg cursor-pointer hover:bg-muted transition-smooth">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-3"
                />
                <Icon name="CreditCard" size={20} className="mr-3 text-primary" />
                <span className="text-foreground">Credit/Debit Card</span>
              </label>
              
              <label className="flex items-center p-3 border border-border rounded-lg cursor-pointer hover:bg-muted transition-smooth">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={paymentMethod === 'upi'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-3"
                />
                <Icon name="Smartphone" size={20} className="mr-3 text-primary" />
                <span className="text-foreground">UPI Payment</span>
              </label>
              
              <label className="flex items-center p-3 border border-border rounded-lg cursor-pointer hover:bg-muted transition-smooth">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="netbanking"
                  checked={paymentMethod === 'netbanking'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-3"
                />
                <Icon name="Building" size={20} className="mr-3 text-primary" />
                <span className="text-foreground">Net Banking</span>
              </label>
            </div>
          </div>

          {/* Card Details Form */}
          {paymentMethod === 'card' && (
            <div className="space-y-4 mb-6">
              <Input
                label="Card Number"
                type="text"
                placeholder="1234 5678 9012 3456"
                value={cardDetails.number}
                onChange={(e) => handleCardChange('number', e.target.value)}
                maxLength="19"
              />
              
              <Input
                label="Cardholder Name"
                type="text"
                placeholder="John Doe"
                value={cardDetails.name}
                onChange={(e) => handleCardChange('name', e.target.value)}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Expiry Date"
                  type="text"
                  placeholder="MM/YY"
                  value={cardDetails.expiry}
                  onChange={(e) => handleCardChange('expiry', e.target.value)}
                  maxLength="5"
                />
                
                <Input
                  label="CVV"
                  type="text"
                  placeholder="123"
                  value={cardDetails.cvv}
                  onChange={(e) => handleCardChange('cvv', e.target.value)}
                  maxLength="3"
                />
              </div>
            </div>
          )}

          {/* UPI Payment */}
          {paymentMethod === 'upi' && (
            <div className="mb-6">
              <Input
                label="UPI ID"
                type="text"
                placeholder="yourname@paytm"
                description="Enter your UPI ID to proceed with payment"
              />
            </div>
          )}

          {/* Net Banking */}
          {paymentMethod === 'netbanking' && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-foreground mb-2">
                Select Your Bank
              </label>
              <select className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="">Choose your bank</option>
                <option value="sbi">State Bank of India</option>
                <option value="hdfc">HDFC Bank</option>
                <option value="icici">ICICI Bank</option>
                <option value="axis">Axis Bank</option>
                <option value="kotak">Kotak Mahindra Bank</option>
              </select>
            </div>
          )}

          {/* Security Notice */}
          <div className="bg-muted rounded-lg p-3 mb-6">
            <div className="flex items-start">
              <Icon name="Shield" size={16} className="mr-2 text-success mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Secure Payment</p>
                <p className="text-xs text-muted-foreground">
                  Your payment information is encrypted and secure. We don't store your card details.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={processing}
              fullWidth
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handlePayment}
              loading={processing}
              iconName="CreditCard"
              iconPosition="left"
              fullWidth
            >
              {processing ? 'Processing...' : 'Pay ₹500'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;