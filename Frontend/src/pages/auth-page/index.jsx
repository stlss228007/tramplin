import React, { useState } from 'react';
import { LoginForm } from '@/features/auth/components/LoginForm';
import { RegisterForm } from '@/features/auth/components/RegisterForm';
import { RegisterStep2 } from '@/features/auth/components/RegisterStep2';
import { useNavigate } from 'react-router-dom';
import { mockUsers } from '@/shared/api/mock/mock-auth';

export default function AuthPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState(1);
  const [users, setUsers] = useState(mockUsers);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirm: ''
  });
  const [registerError, setRegisterError] = useState('');
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const [resetError, setResetError] = useState('');

  const handleLogin = (credentials) => {
    const foundUser = users.find(
      user => user.email === credentials.email && user.password === credentials.password
    );

    if (foundUser) {
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      
      if (foundUser.role === 'applicant') {
        navigate('/profile/applicant');
      } else if (foundUser.role === 'employer') {
        navigate('/profile/employer');
      } else if (foundUser.role === 'curator') {
        navigate('/profile/curator');
      }
      return { success: true };
    }

    return { success: false, error: 'Неверный email или пароль' };
  };

  const handleNextStep = () => {
    setStep(2);
  };

  const handleBackToStep1 = () => {
    setStep(1);
    setRegisterError('');
  };

  const handleFinalSubmit = async (role, profileData) => {
    if (!role) {
      setRegisterError('Выберите роль');
      return;
    }
    
    setIsRegisterLoading(true);
    
    try {
      const newUser = {
        id: Date.now(),
        email: formData.email,
        password: formData.password,
        role: role,
        profile: profileData
      };
      
      setUsers(prev => [...prev, newUser]);
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      
      if (role === 'applicant') {
        navigate('/profile/applicant');
      } else if (role === 'employer') {
        navigate('/profile/employer');
      } else if (role === 'curator') {
        navigate('/profile/curator');
      }
    } catch (err) {
      setRegisterError('Ошибка при регистрации');
    } finally {
      setIsRegisterLoading(false);
    }
  };

  const handleSwitchToLogin = () => {
    setIsLogin(true);
    setStep(1);
    setFormData({
      email: '',
      password: '',
      passwordConfirm: ''
    });
    setRegisterError('');
  };

  const handleSwitchToRegister = () => {
    setIsLogin(false);
    setStep(1);
    setRegisterError('');
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    
    if (!resetEmail) {
      setResetError('Введите email');
      return;
    }
    
    if (!/^[^\s@]+@([^\s@]+\.)+[^\s@]+$/.test(resetEmail)) {
      setResetError('Введите корректный email');
      return;
    }
    
    const userExists = users.some(u => u.email === resetEmail);
    
    if (!userExists) {
      setResetError('Пользователь с таким email не найден');
      return;
    }
    
    setResetError('');
    setResetMessage('Инструкция по восстановлению пароля отправлена на вашу почту');
    
    setTimeout(() => {
      setShowForgotPassword(false);
      setResetEmail('');
      setResetMessage('');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-black p-4 relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-950 z-0"></div>
      
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-800 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Трамплин</h1>
            <p className="text-gray-400">Карьерная платформа для IT</p>
          </div>

          {isLogin ? (
            <>
              <div className="flex gap-2 p-1 bg-gray-800 rounded-xl mb-8">
                <button className="flex-1 py-2.5 text-sm font-medium rounded-lg bg-gray-700 text-white shadow">
                  Вход
                </button>
                <button
                  onClick={handleSwitchToRegister}
                  className="flex-1 py-2.5 text-sm font-medium rounded-lg text-gray-400 hover:text-gray-200"
                >
                  Регистрация
                </button>
              </div>
              <LoginForm onLogin={handleLogin} onSwitchToRegister={handleSwitchToRegister} onForgotPassword={handleForgotPassword} />
            </>
          ) : step === 1 ? (
            <>
              <div className="flex gap-2 p-1 bg-gray-800 rounded-xl mb-8">
                <button
                  onClick={handleSwitchToLogin}
                  className="flex-1 py-2.5 text-sm font-medium rounded-lg text-gray-400 hover:text-gray-200"
                >
                  Вход
                </button>
                <button className="flex-1 py-2.5 text-sm font-medium rounded-lg bg-gray-700 text-white shadow">
                  Регистрация
                </button>
              </div>
              <RegisterForm
                onNext={handleNextStep}
                formData={formData}
                setFormData={setFormData}
                isLoading={isRegisterLoading}
              />
            </>
          ) : (
            <>
              <div className="flex gap-2 p-1 bg-gray-800 rounded-xl mb-8">
                <button
                  onClick={handleSwitchToLogin}
                  className="flex-1 py-2.5 text-sm font-medium rounded-lg text-gray-400 hover:text-gray-200"
                >
                  Вход
                </button>
                <button className="flex-1 py-2.5 text-sm font-medium rounded-lg bg-gray-700 text-white shadow">
                  Регистрация
                </button>
              </div>
              <RegisterStep2
                onBack={handleBackToStep1}
                onSubmit={handleFinalSubmit}
                error={registerError}
                isLoading={isRegisterLoading}
              />
            </>
          )}
        </div>
      </div>

      {showForgotPassword && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-gray-900 rounded-2xl border border-gray-700 p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Восстановление пароля</h2>
              <button
                onClick={() => {
                  setShowForgotPassword(false);
                  setResetEmail('');
                  setResetError('');
                  setResetMessage('');
                }}
                className="text-gray-400 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                </svg>
              </button>
            </div>
            
            {resetMessage ? (
              <div className="bg-green-900/50 border border-green-700 text-green-200 px-4 py-3 rounded-xl text-sm mb-4">
                {resetMessage}
              </div>
            ) : (
              <form onSubmit={handleResetPassword}>
                <p className="text-gray-400 text-sm mb-4">
                  Введите email, указанный при регистрации, и мы отправим инструкцию по восстановлению пароля.
                </p>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => {
                      setResetEmail(e.target.value);
                      setResetError('');
                    }}
                    className={`w-full bg-gray-800 border rounded-xl p-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent ${
                      resetError ? 'border-red-500' : 'border-gray-700'
                    }`}
                    placeholder="name@example.com"
                  />
                  {resetError && (
                    <p className="text-red-400 text-xs mt-1 ml-1">{resetError}</p>
                  )}
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-medium"
                >
                  Отправить
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}