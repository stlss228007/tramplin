import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockUsers } from '@/shared/api/mock/mock-auth';
import styles from './LoginForm.module.css';

export const LoginForm = ({ onForgotPassword }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = { email: '', password: '' };
    let isValid = true;

    if (!email.trim()) {
      newErrors.email = 'Email обязателен';
      isValid = false;
    } else if (!/^[^\s@]+@([^\s@]+\.)+[^\s@]+$/.test(email)) {
      newErrors.email = 'Введите корректный email';
      isValid = false;
    }

    if (!password.trim()) {
      newErrors.password = 'Пароль обязателен';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const users = mockUsers;
      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        if (user.role === 'applicant') {
          window.location.href = '/profile/applicant';
        } else if (user.role === 'employer') {
          window.location.href = '/profile/employer';
        } else if (user.role === 'curator') {
          window.location.href = '/profile/curator';
        }
      } else {
        const userExists = users.some(u => u.email === email);
        if (userExists) {
          setErrors({ email: '', password: 'Неверный пароль' });
        } else {
          setErrors({ email: 'Пользователь не найден', password: '' });
        }
      }
    } catch (err) {
      setErrors({ email: '', password: 'Ошибка при входе. Попробуйте позже.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div>
        <label className={styles.label}>Email</label>
        <div className={styles.inputWrapper}>
          <Mail className={styles.icon} />
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors({ ...errors, email: '' });
              if (errors.password === 'Неверный пароль') setErrors({ ...errors, password: '' });
            }}
            className={`${styles.input} ${errors.email ? styles['input--error'] : ''}`}
            placeholder="name@example.com"
            disabled={isLoading}
          />
        </div>
        {errors.email && (
          <p className="text-red-400 text-xs mt-1 ml-1">{errors.email}</p>
        )}
      </div>
      
      <div>
        <label className={styles.label}>Пароль</label>
        <div className={styles.inputWrapper}>
          <Lock className={styles.icon} />
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors({ ...errors, password: '' });
            }}
            className={`${styles.input} ${errors.password ? styles['input--error'] : ''}`}
            placeholder="••••••••"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={styles.passwordToggle}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-400 text-xs mt-1 ml-1">{errors.password}</p>
        )}
      </div>
      
      <div className="text-right">
        <button
          type="button"
          onClick={onForgotPassword}
          className={styles.forgotPasswordLink}
        >
          Забыли пароль?
        </button>
      </div>
      
      <Button
        type="submit"
        className={styles.submitButton}
        disabled={isLoading}
      >
        {isLoading ? 'Вход...' : 'Войти'}
      </Button>
    </form>
  );
};