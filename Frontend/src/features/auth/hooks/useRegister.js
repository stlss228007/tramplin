import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { showToast } from '@/shared/lib/toast';
import { mockRegister } from '@/shared/api/mock/mock-auth';

export const useRegister = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirm: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateStep1 = () => {
    if (!formData.email || !formData.password || !formData.passwordConfirm) {
      setError('Заполните все поля');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Введите корректный email');
      return false;
    }
    
    if (formData.password.length < 6) {
      setError('Пароль должен быть не менее 6 символов');
      return false;
    }
    
    if (formData.password !== formData.passwordConfirm) {
      setError('Пароли не совпадают');
      return false;
    }
    
    return true;
  };

  const handleStep1Submit = (e) => {
    e.preventDefault();
    if (validateStep1()) {
      setStep(2);
      setError('');
    }
  };

  const handleFinalSubmit = async (role, profileData) => {
    setError('');
    
    if (!role) {
      setError('Выберите роль: соискатель или работодатель');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = mockRegister(
        { email: formData.email, password: formData.password },
        role,
        profileData
      );
      
      if (response.success) {
        localStorage.setItem('currentUser', JSON.stringify(response.user));
        showToast('Регистрация успешна! Добро пожаловать в личный кабинет.', 'success');
        
        if (role === 'applicant') {
          navigate('/profile/applicant');
        } else if (role === 'employer') {
          navigate('/profile/employer');
        } else if (role === 'curator') {
          navigate('/profile/curator');
        }
      } else {
        setError(response.error);
        showToast(response.error, 'error');
      }
    } catch (err) {
      setError('Ошибка при регистрации. Попробуйте позже.');
      showToast('Ошибка при регистрации', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const resetToStep1 = () => {
    setStep(1);
    setError('');
  };

  return {
    step,
    formData,
    setFormData,
    error,
    isLoading,
    handleStep1Submit,
    handleFinalSubmit,
    resetToStep1
  };
};