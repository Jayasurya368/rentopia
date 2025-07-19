import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import ProgressIndicator from './components/ProgressIndicator';
import BasicInfoStep from './components/BasicInfoStep';
import PhotoUploadStep from './components/PhotoUploadStep';
import PropertyDetailsStep from './components/PropertyDetailsStep';
import PricingStep from './components/PricingStep';
import PreviewStep from './components/PreviewStep';
import PaymentModal from './components/PaymentModal';

const PropertyListingCreation = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isFirstListing, setIsFirstListing] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState('saved');
  const [isDraft, setIsDraft] = useState(false);

  const totalSteps = 4;

  useEffect(() => {
    // Check if user is authenticated and is an owner
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.id || user.role !== 'owner') {
      navigate('/user-authentication-login-register');
      return;
    }

    // Check if this is the first listing
    const existingListings = JSON.parse(localStorage.getItem('userListings') || '[]');
    const userListings = existingListings.filter(listing => listing.ownerId === user.id);
    setIsFirstListing(userListings.length === 0);

    // Load draft if exists
    const draft = localStorage.getItem('listingDraft');
    if (draft) {
      setFormData(JSON.parse(draft));
      setIsDraft(true);
    }

    // Auto-save functionality
    const autoSaveInterval = setInterval(() => {
      if (Object.keys(formData).length > 0) {
        localStorage.setItem('listingDraft', JSON.stringify(formData));
        setAutoSaveStatus('saving');
        setTimeout(() => setAutoSaveStatus('saved'), 1000);
      }
    }, 30000); // Auto-save every 30 seconds

    return () => clearInterval(autoSaveInterval);
  }, [navigate, formData]);

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.title?.trim()) newErrors.title = 'Property title is required';
        if (!formData.address?.trim()) newErrors.address = 'Address is required';
        if (!formData.propertyType) newErrors.propertyType = 'Property type is required';
        if (!formData.bhk) newErrors.bhk = 'BHK configuration is required';
        if (!formData.availableFrom) newErrors.availableFrom = 'Available date is required';
        if (!formData.area || formData.area < 100) newErrors.area = 'Area must be at least 100 sq ft';
        break;

      case 2:
        if (!formData.photos || formData.photos.length === 0) {
          newErrors.photos = 'At least one photo is required';
        }
        break;

      case 3:
        if (!formData.description?.trim() || formData.description.length < 100) {
          newErrors.description = 'Description must be at least 100 characters';
        }
        break;

      case 4:
        if (!formData.rent || formData.rent < 1000) {
          newErrors.rent = 'Monthly rent must be at least ₹1,000';
        }
        if (!formData.securityDeposit || formData.securityDeposit < 0) {
          newErrors.securityDeposit = 'Security deposit is required';
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      } else {
        handlePreview();
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepChange = (step) => {
    setCurrentStep(step);
  };

  const handlePreview = () => {
    setCurrentStep(5); // Preview step
  };

  const handleEdit = (step) => {
    setCurrentStep(step);
  };

  const handlePublish = () => {
    if (!isFirstListing) {
      setShowPaymentModal(true);
    } else {
      publishListing();
    }
  };

  const handlePaymentSuccess = () => {
    publishListing();
  };

  const publishListing = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const newListing = {
      id: Date.now().toString(),
      ownerId: user.id,
      ownerName: user.name,
      ownerPhone: user.phone,
      ...formData,
      status: 'active',
      createdAt: new Date().toISOString(),
      views: 0,
      inquiries: 0,
      featured: isFirstListing
    };

    // Save to localStorage
    const existingListings = JSON.parse(localStorage.getItem('userListings') || '[]');
    existingListings.push(newListing);
    localStorage.setItem('userListings', JSON.stringify(existingListings));

    // Clear draft
    localStorage.removeItem('listingDraft');

    // Navigate to dashboard with success message
    navigate('/owner-dashboard', { 
      state: { 
        message: 'Property listed successfully!',
        listingId: newListing.id
      }
    });
  };

  const saveDraft = () => {
    localStorage.setItem('listingDraft', JSON.stringify(formData));
    setAutoSaveStatus('saved');
    navigate('/owner-dashboard', {
      state: { message: 'Draft saved successfully!' }
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInfoStep
            data={formData}
            onChange={setFormData}
            errors={errors}
          />
        );
      case 2:
        return (
          <PhotoUploadStep
            data={formData}
            onChange={setFormData}
            errors={errors}
          />
        );
      case 3:
        return (
          <PropertyDetailsStep
            data={formData}
            onChange={setFormData}
            errors={errors}
          />
        );
      case 4:
        return (
          <PricingStep
            data={formData}
            onChange={setFormData}
            errors={errors}
          />
        );
      case 5:
        return (
          <PreviewStep
            data={formData}
            onEdit={handleEdit}
          />
        );
      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Basic Information';
      case 2: return 'Property Photos';
      case 3: return 'Property Details';
      case 4: return 'Pricing & Terms';
      case 5: return 'Preview & Publish';
      default: return 'Create Listing';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Create Property Listing
              </h1>
              <p className="text-muted-foreground mt-2">
                {getStepTitle()} • Step {Math.min(currentStep, totalSteps)} of {totalSteps}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Auto-save Status */}
              <div className="flex items-center text-sm text-muted-foreground">
                <Icon 
                  name={autoSaveStatus === 'saving' ? 'Loader2' : 'Check'} 
                  size={16} 
                  className={`mr-1 ${autoSaveStatus === 'saving' ? 'animate-spin' : 'text-success'}`}
                />
                <span>
                  {autoSaveStatus === 'saving' ? 'Saving...' : 'Auto-saved'}
                </span>
              </div>
              
              {/* First Listing Badge */}
              {isFirstListing && (
                <div className="bg-success/10 text-success px-3 py-1 rounded-full text-sm font-medium">
                  <Icon name="Gift" size={14} className="mr-1 inline" />
                  First listing free!
                </div>
              )}
            </div>
          </div>

          {/* Draft Notice */}
          {isDraft && (
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <Icon name="FileText" size={20} className="mr-2 text-warning" />
                <div>
                  <p className="font-medium text-foreground">Draft Loaded</p>
                  <p className="text-sm text-muted-foreground">
                    You have unsaved changes from a previous session. Continue editing or start fresh.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Progress Indicator */}
          {currentStep <= totalSteps && (
            <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />
          )}
        </div>

        {/* Step Content */}
        <div className="mb-8">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex space-x-3">
              {currentStep > 1 && currentStep <= totalSteps && (
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  iconName="ChevronLeft"
                  iconPosition="left"
                >
                  Previous
                </Button>
              )}
              
              <Button
                variant="ghost"
                onClick={saveDraft}
                iconName="Save"
                iconPosition="left"
              >
                Save Draft
              </Button>
            </div>

            <div className="flex space-x-3">
              {currentStep === 5 ? (
                <Button
                  variant="default"
                  onClick={handlePublish}
                  iconName="Upload"
                  iconPosition="left"
                  className="bg-success hover:bg-success/90 text-success-foreground"
                >
                  {isFirstListing ? 'Publish Listing (Free)' : 'Publish Listing (₹500)'}
                </Button>
              ) : (
                <Button
                  variant="default"
                  onClick={handleNext}
                  iconName="ChevronRight"
                  iconPosition="right"
                >
                  {currentStep === totalSteps ? 'Preview' : 'Next'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

export default PropertyListingCreation;