// src/features/auth/components/RegisterForm.jsx

import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const RegisterForm = ({ onNext, onSwitchToLogin, formData, setFormData, isLoading }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    passwordConfirm: ''
  });

  const validateForm = () => {
    const newErrors = { email: '', password: '', passwordConfirm: '' };
    let isValid = true;

    if (!formData.email.trim()) {
      newErrors.email = 'Email обязателен';
      isValid = false;
    } else if (!/^[^\s@]+@([^\s@]+\.)+[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Введите корректный email';
      isValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Пароль обязателен';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен быть не менее 6 символов';
      isValid = false;
    }

    if (!formData.passwordConfirm.trim()) {
      newErrors.passwordConfirm = 'Подтвердите пароль';
      isValid = false;
    } else if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = 'Пароли не совпадают';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input
            type="email"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              if (errors.email) setErrors({ ...errors, email: '' });
            }}
            className={`w-full pl-10 pr-3 py-2.5 bg-gray-800 border rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent ${
              errors.email ? 'border-red-500' : 'border-gray-700'
            }`}
            placeholder="student@university.ru"
            disabled={isLoading}
          />
        </div>
        {errors.email && (
          <p className="text-red-400 text-xs mt-1 ml-1">{errors.email}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Пароль</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
              if (errors.password) setErrors({ ...errors, password: '' });
            }}
            className={`w-full pl-10 pr-10 py-2.5 bg-gray-800 border rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent ${
              errors.password ? 'border-red-500' : 'border-gray-700'
            }`}
            placeholder="минимум 6 символов"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-400 text-xs mt-1 ml-1">{errors.password}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Подтвердите пароль</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input
            type={showPassword ? 'text' : 'password'}
            value={formData.passwordConfirm}
            onChange={(e) => {
              setFormData({ ...formData, passwordConfirm: e.target.value });
              if (errors.passwordConfirm) setErrors({ ...errors, passwordConfirm: '' });
            }}
            className={`w-full pl-10 pr-3 py-2.5 bg-gray-800 border rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent ${
              errors.passwordConfirm ? 'border-red-500' : 'border-gray-700'
            }`}
            placeholder="повторите пароль"
            disabled={isLoading}
          />
        </div>
        {errors.passwordConfirm && (
          <p className="text-red-400 text-xs mt-1 ml-1">{errors.passwordConfirm}</p>
        )}
      </div>
      
      <Button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700"
        disabled={isLoading}
      >
        {isLoading ? 'Проверка...' : 'Продолжить'}
      </Button>
    </form>
  );
};