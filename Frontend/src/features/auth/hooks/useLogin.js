// src/features/auth/hooks/useLogin.js

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { showToast } from '@/shared/lib/toast';
import { mockLogin } from '@/shared/api/mock/mock-auth';

export const useLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Заполните все поля');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = mockLogin(email, password);
      
      if (response.success) {


        
        switch (response.user.role) {
          case 'applicant':
            navigate('/profile/applicant');
            break;
          case 'employer':
            navigate('/profile/employer');
            break;
          case 'curator':
            navigate('/profile/curator');
            break;
          default:
            navigate('/');
        }
      } else {
        setError(response.error);
        showToast(response.error, 'error');
      }
    } catch (err) {
      setError('Ошибка при входе. Попробуйте позже.');
      showToast('Ошибка при входе', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    isLoading,
    handleSubmit
  };
};