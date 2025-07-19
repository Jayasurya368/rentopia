import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import RoleSelector from './RoleSelector';

const RegisterForm = ({ onSubmit, loading, errors }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    role: '',
    agreeToTerms: false,
    agreeToPrivacy: false
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Full Name"
        type="text"
        placeholder="Enter your full name"
        value={formData.fullName}
        onChange={(e) => handleInputChange('fullName', e.target.value)}
        error={errors.fullName}
        required
      />

      <Input
        label="Email Address"
        type="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={(e) => handleInputChange('email', e.target.value)}
        error={errors.email}
        required
      />

      <Input
        label="Phone Number"
        type="tel"
        placeholder="Enter your phone number"
        value={formData.phoneNumber}
        onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
        error={errors.phoneNumber}
        required
      />

      <RoleSelector
        selectedRole={formData.role}
        onRoleChange={(role) => handleInputChange('role', role)}
        error={errors.role}
      />

      <Input
        label="Password"
        type="password"
        placeholder="Create a password"
        description="Must be at least 8 characters"
        value={formData.password}
        onChange={(e) => handleInputChange('password', e.target.value)}
        error={errors.password}
        required
      />

      <Input
        label="Confirm Password"
        type="password"
        placeholder="Confirm your password"
        value={formData.confirmPassword}
        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
        error={errors.confirmPassword}
        required
      />

      <div className="space-y-3">
        <Checkbox
          label="I agree to the Terms of Service"
          checked={formData.agreeToTerms}
          onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
          error={errors.agreeToTerms}
          required
        />
        
        <Checkbox
          label="I agree to the Privacy Policy"
          checked={formData.agreeToPrivacy}
          onChange={(e) => handleInputChange('agreeToPrivacy', e.target.checked)}
          error={errors.agreeToPrivacy}
          required
        />
      </div>

      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={loading}
        iconName="UserPlus"
        iconPosition="right"
      >
        Create Account
      </Button>
    </form>
  );
};

export default RegisterForm;