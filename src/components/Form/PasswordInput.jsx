import React, { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import FormInput from './FormInput';
import { calculatePasswordStrength, passwordStrengthLevels } from '../../lib/formValidation';

const PasswordInput = ({
  value,
  onChange,
  showStrengthIndicator = true,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const strength = calculatePasswordStrength(value || '');

  return (
    <div className="space-y-2">
      <div className="relative">
        <FormInput
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          className="pr-10"
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
        >
          {showPassword ? (
            <EyeSlashIcon className="h-5 w-5" />
          ) : (
            <EyeIcon className="h-5 w-5" />
          )}
        </button>
      </div>

      {showStrengthIndicator && value && (
        <div className="space-y-2">
          <div className="flex gap-1 h-1">
            {[0, 1, 2, 3].map((level) => (
              <div
                key={level}
                className={`h-full flex-1 rounded-full transition-colors ${
                  level <= strength ? passwordStrengthLevels[strength].color : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            Password strength: {passwordStrengthLevels[strength].label}
          </p>
        </div>
      )}
    </div>
  );
};

export default PasswordInput;
