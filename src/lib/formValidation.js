export const passwordStrengthLevels = {
  0: { label: 'Very Weak', color: 'bg-red-500' },
  1: { label: 'Weak', color: 'bg-orange-500' },
  2: { label: 'Medium', color: 'bg-yellow-500' },
  3: { label: 'Strong', color: 'bg-green-500' },
  4: { label: 'Very Strong', color: 'bg-green-600' },
};

export const calculatePasswordStrength = (password) => {
  let strength = 0;
  
  if (password.length >= 8) strength++;
  if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
  if (password.match(/\d/)) strength++;
  if (password.match(/[^a-zA-Z\d]/)) strength++;
  
  return strength;
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return 'Email is required';
  if (!emailRegex.test(email)) return 'Invalid email format';
  return '';
};

export const validatePassword = (password) => {
  if (!password) return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters';
  if (!password.match(/[a-z]/)) return 'Password must contain a lowercase letter';
  if (!password.match(/[A-Z]/)) return 'Password must contain an uppercase letter';
  if (!password.match(/\d/)) return 'Password must contain a number';
  if (!password.match(/[^a-zA-Z\d]/)) return 'Password must contain a special character';
  return '';
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) return 'Please confirm your password';
  if (password !== confirmPassword) return 'Passwords do not match';
  return '';
};

export const validateRequired = (value, fieldName) => {
  if (!value) return `${fieldName} is required`;
  return '';
};

export const validateLength = (value, fieldName, min, max) => {
  if (value.length < min) return `${fieldName} must be at least ${min} characters`;
  if (max && value.length > max) return `${fieldName} must be less than ${max} characters`;
  return '';
};
