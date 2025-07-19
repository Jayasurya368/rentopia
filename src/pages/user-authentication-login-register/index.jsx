import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthHeader from './components/AuthHeader';
import AuthToggle from './components/AuthToggle';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import SocialAuth from './components/SocialAuth';

const UserAuthenticationPage = () => {
  const [mode, setMode] = useState('login');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Mock credentials for testing
  const mockCredentials = {
    seeker: {
      email: 'seeker@rentopia.com',
      phone: '9876543210',
      password: 'seeker123'
    },
    owner: {
      email: 'owner@rentopia.com',
      phone: '9876543211',
      password: 'owner123'
    }
  };

  const validateLoginForm = (data) => {
    const newErrors = {};
    
    if (!data.emailOrPhone.trim()) {
      newErrors.emailOrPhone = 'Email or phone number is required';
    }
    
    if (!data.password.trim()) {
      newErrors.password = 'Password is required';
    }
    
    return newErrors;
  };

  const validateRegisterForm = (data) => {
    const newErrors = {};
    
    if (!data.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!data.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!data.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(data.phoneNumber.replace(/\D/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
    }
    
    if (!data.role) {
      newErrors.role = 'Please select your role';
    }
    
    if (!data.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (data.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (!data.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!data.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the Terms of Service';
    }
    
    if (!data.agreeToPrivacy) {
      newErrors.agreeToPrivacy = 'You must agree to the Privacy Policy';
    }
    
    return newErrors;
  };

  const handleLogin = async (formData) => {
    const validationErrors = validateLoginForm(formData);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Check mock credentials
      const { emailOrPhone, password } = formData;
      let authenticatedUser = null;

      Object.entries(mockCredentials).forEach(([role, creds]) => {
        if ((emailOrPhone === creds.email || emailOrPhone === creds.phone) && password === creds.password) {
          authenticatedUser = {
            id: role === 'seeker' ? 1 : 2,
            name: role === 'seeker' ? 'John Seeker' : 'Jane Owner',
            email: creds.email,
            phone: creds.phone,
            role: role,
            avatar: `https://randomuser.me/api/portraits/${role === 'seeker' ? 'men' : 'women'}/${role === 'seeker' ? '32' : '45'}.jpg`,
            joinedDate: '2024-01-15',
            isVerified: true
          };
        }
      });

      if (authenticatedUser) {
        // Store user data
        localStorage.setItem('user', JSON.stringify(authenticatedUser));
        
        // Redirect based on role
        if (authenticatedUser.role === 'owner') {
          navigate('/owner-dashboard');
        } else {
          navigate('/property-search-results');
        }
      } else {
        setErrors({
          emailOrPhone: 'Invalid credentials. Use seeker@rentopia.com/9876543210 with seeker123 or owner@rentopia.com/9876543211 with owner123'
        });
      }
    } catch (error) {
      setErrors({
        general: 'Login failed. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (formData) => {
    const validationErrors = validateRegisterForm(formData);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create new user
      const newUser = {
        id: Date.now(),
        name: formData.fullName,
        email: formData.email,
        phone: formData.phoneNumber,
        role: formData.role,
        avatar: `https://randomuser.me/api/portraits/${formData.role === 'seeker' ? 'men' : 'women'}/1.jpg`,
        joinedDate: new Date().toISOString().split('T')[0],
        isVerified: false
      };

      // Store user data
      localStorage.setItem('user', JSON.stringify(newUser));
      
      // Redirect based on role
      if (newUser.role === 'owner') {
        navigate('/owner-dashboard');
      } else {
        navigate('/property-search-results');
      }
    } catch (error) {
      setErrors({
        general: 'Registration failed. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setLoading(true);
    
    try {
      // Simulate social login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const socialUser = {
        id: Date.now(),
        name: provider === 'google' ? 'Google User' : 'Facebook User',
        email: `${provider}user@example.com`,
        phone: '9876543212',
        role: 'seeker',
        avatar: `https://randomuser.me/api/portraits/men/20.jpg`,
        joinedDate: new Date().toISOString().split('T')[0],
        isVerified: true
      };

      localStorage.setItem('user', JSON.stringify(socialUser));
      navigate('/property-search-results');
    } catch (error) {
      setErrors({
        general: `${provider} login failed. Please try again.`
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-lg shadow-card p-6 sm:p-8">
          <AuthHeader mode={mode} />
          
          <AuthToggle activeMode={mode} onModeChange={setMode} />
          
          {errors.general && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-sm text-destructive">{errors.general}</p>
            </div>
          )}
          
          {mode === 'login' ? (
            <LoginForm
              onSubmit={handleLogin}
              loading={loading}
              errors={errors}
            />
          ) : (
            <RegisterForm
              onSubmit={handleRegister}
              loading={loading}
              errors={errors}
            />
          )}
          
          <div className="mt-8">
            <SocialAuth
              onSocialLogin={handleSocialLogin}
              loading={loading}
            />
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => {
                  setMode(mode === 'login' ? 'register' : 'login');
                  setErrors({});
                }}
                className="text-primary hover:text-primary/80 font-medium transition-smooth"
              >
                {mode === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserAuthenticationPage;