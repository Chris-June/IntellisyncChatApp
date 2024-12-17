/**
 * Input validation utilities
 * Setup file for comprehensive input validation
 */

// Regular expressions for common validations
export const VALIDATION_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  PHONE: /^\+?[\d\s-]{10,}$/,
  USERNAME: /^[a-zA-Z0-9_]{3,20}$/,
  DATE: /^\d{4}-\d{2}-\d{2}$/,
  SAFE_STRING: /^[^<>'"`;]*$/,
  NUMERIC: /^\d+$/,
  DECIMAL: /^\d*\.?\d+$/
};

// Input validation rules
export const ValidationRules = {
  // User input validation
  user: {
    username: {
      pattern: VALIDATION_PATTERNS.USERNAME,
      minLength: 3,
      maxLength: 20,
      required: true
    },
    email: {
      pattern: VALIDATION_PATTERNS.EMAIL,
      required: true
    },
    password: {
      pattern: VALIDATION_PATTERNS.PASSWORD,
      minLength: 8,
      required: true
    }
  },

  // Academic data validation
  academic: {
    grade: {
      min: 0,
      max: 100,
      pattern: VALIDATION_PATTERNS.DECIMAL
    },
    attendance: {
      min: 0,
      max: 100,
      pattern: VALIDATION_PATTERNS.DECIMAL
    },
    subjectName: {
      minLength: 1,
      maxLength: 50,
      pattern: VALIDATION_PATTERNS.SAFE_STRING
    }
  },

  // File upload validation
  fileUpload: {
    allowedTypes: ['image/jpeg', 'image/png', 'application/pdf'],
    maxSize: 5 * 1024 * 1024, // 5MB
    namePattern: /^[a-zA-Z0-9_-]+\.[a-zA-Z0-9]+$/
  }
};

// Validation error messages
export const ValidationErrors = {
  REQUIRED: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PASSWORD: 'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character',
  INVALID_USERNAME: 'Username must be 3-20 characters long and can only contain letters, numbers and underscores',
  INVALID_PHONE: 'Please enter a valid phone number',
  INVALID_DATE: 'Please enter a valid date in YYYY-MM-DD format',
  INVALID_NUMBER: 'Please enter a valid number',
  FILE_TOO_LARGE: 'File size exceeds maximum limit',
  INVALID_FILE_TYPE: 'File type not supported'
};
