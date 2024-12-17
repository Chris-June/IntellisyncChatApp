import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from '../../contexts/FormContext';
import FormInput from '../Form/FormInput';
import PasswordInput from '../Form/PasswordInput';
import { validateEmail, validatePassword, validateConfirmPassword } from '../../lib/formValidation';
import { useToast } from '../../contexts/ToastContext';
import { authService } from '../../services/auth/supabaseAuth';

const SignUpForm = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const { user, error } = await authService.signUp({
        email: values.email,
        password: values.password,
        role: 'student'
      });

      if (error) throw new Error(error);

      addToast({
        type: 'success',
        message: 'Account created successfully!'
      });
      navigate('/dashboard');
    } catch (error) {
      addToast({
        type: 'error',
        message: error.message || 'Failed to create account'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormProvider
      initialValues={{
        email: '',
        password: '',
        confirmPassword: ''
      }}
      onSubmit={handleSubmit}
    >
      <SignUpFormFields isLoading={isLoading} />
    </FormProvider>
  );
};

const SignUpFormFields = ({ isLoading }) => {
  const {
    values,
    errors,
    setValue,
    setError,
    handleSubmit
  } = useForm();

  const validateFields = useCallback(() => {
    const emailError = validateEmail(values.email);
    const passwordError = validatePassword(values.password);
    const confirmPasswordError = validateConfirmPassword(
      values.password,
      values.confirmPassword
    );

    setError('email', emailError);
    setError('password', passwordError);
    setError('confirmPassword', confirmPasswordError);

    return !emailError && !passwordError && !confirmPasswordError;
  }, [values, setError]);

  const handleFormSubmit = (e) => {
    if (validateFields()) {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      <FormInput
        label="Email"
        type="email"
        required
        value={values.email}
        onChange={(e) => setValue('email', e.target.value)}
        error={errors.email}
        placeholder="Enter your email"
      />

      <PasswordInput
        label="Password"
        required
        value={values.password}
        onChange={(e) => setValue('password', e.target.value)}
        error={errors.password}
        placeholder="Create a password"
      />

      <PasswordInput
        label="Confirm Password"
        required
        value={values.confirmPassword}
        onChange={(e) => setValue('confirmPassword', e.target.value)}
        error={errors.confirmPassword}
        placeholder="Confirm your password"
        showStrengthIndicator={false}
      />

      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </button>
    </form>
  );
};

export default SignUpForm;
