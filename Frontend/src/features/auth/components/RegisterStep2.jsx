import React, { useState } from 'react';
import { GraduationCap, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const RegisterStep2 = ({ onBack, onSubmit, error, isLoading }) => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [applicantData, setApplicantData] = useState({
    lastName: '',
    firstName: '',
    secondName: '',
    university: '',
    graduationYear: '2026'
  });
  const [employerData, setEmployerData] = useState({
    companyName: '',
    website: '',
    inn: ''
  });
  const [errors, setErrors] = useState({});

  const validateApplicant = () => {
    const newErrors = {};
    
    if (!applicantData.lastName.trim()) {
      newErrors.lastName = 'Фамилия обязательна';
    }
    if (!applicantData.firstName.trim()) {
      newErrors.firstName = 'Имя обязательно';
    }
    if (!applicantData.secondName.trim()) {
      newErrors.secondName = 'Отчество обязательно';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateEmployer = () => {
    const newErrors = {};
    
    if (!employerData.companyName.trim()) {
      newErrors.companyName = 'Название компании обязательно';
    }
    
    if (!employerData.inn.trim()) {
      newErrors.inn = 'ИНН обязателен';
    } else if (employerData.inn.length < 10 || employerData.inn.length > 12 || !/^\d+$/.test(employerData.inn)) {
      newErrors.inn = 'ИНН должен содержать 10-12 цифр';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedRole) {
      setErrors({ role: 'Выберите роль: соискатель или работодатель' });
      return;
    }
    
    setErrors({});
    
    let isValid = false;
    let profileData = null;
    
    if (selectedRole === 'applicant') {
      isValid = validateApplicant();
      if (isValid) {
        profileData = applicantData;
      }
    } else {
      isValid = validateEmployer();
      if (isValid) {
        profileData = employerData;
      }
    }
    
    if (isValid && profileData) {
      onSubmit(selectedRole, profileData);
    }
  };

  const clearFieldError = (field) => {
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && !errors.role && (
        <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-xl text-sm">
          {error}
        </div>
      )}
      
      {errors.role && (
        <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-xl text-sm">
          {errors.role}
        </div>
      )}
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">Выберите роль</label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => {
              setSelectedRole('applicant');
              if (errors.role) setErrors({ ...errors, role: '' });
            }}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
              selectedRole === 'applicant'
                ? 'bg-blue-900/30 border-blue-500 text-blue-300'
                : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600'
            }`}
          >
            <GraduationCap className="w-6 h-6" />
            <span className="text-sm font-medium">Соискатель</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedRole('employer');
              if (errors.role) setErrors({ ...errors, role: '' });
            }}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
              selectedRole === 'employer'
                ? 'bg-blue-900/30 border-blue-500 text-blue-300'
                : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600'
            }`}
          >
            <Building2 className="w-6 h-6" />
            <span className="text-sm font-medium">Работодатель</span>
          </button>
        </div>
      </div>

      {selectedRole === 'applicant' && (
        <div className="space-y-4 border-t border-gray-800 pt-4">
          <h3 className="text-white font-medium">Личная информация</h3>
          
          <div>
            <input
              type="text"
              placeholder="Фамилия *"
              value={applicantData.lastName}
              onChange={(e) => {
                setApplicantData({ ...applicantData, lastName: e.target.value });
                clearFieldError('lastName');
              }}
              className={`w-full bg-gray-800 border rounded-xl p-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent ${
                errors.lastName ? 'border-red-500' : 'border-gray-700'
              }`}
              disabled={isLoading}
            />
            {errors.lastName && (
              <p className="text-red-400 text-xs mt-1 ml-1">{errors.lastName}</p>
            )}
          </div>
          
          <div>
            <input
              type="text"
              placeholder="Имя *"
              value={applicantData.firstName}
              onChange={(e) => {
                setApplicantData({ ...applicantData, firstName: e.target.value });
                clearFieldError('firstName');
              }}
              className={`w-full bg-gray-800 border rounded-xl p-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent ${
                errors.firstName ? 'border-red-500' : 'border-gray-700'
              }`}
              disabled={isLoading}
            />
            {errors.firstName && (
              <p className="text-red-400 text-xs mt-1 ml-1">{errors.firstName}</p>
            )}
          </div>
          
          <div>
            <input
              type="text"
              placeholder="Отчество *"
              value={applicantData.secondName}
              onChange={(e) => {
                setApplicantData({ ...applicantData, secondName: e.target.value });
                clearFieldError('secondName');
              }}
              className={`w-full bg-gray-800 border rounded-xl p-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent ${
                errors.secondName ? 'border-red-500' : 'border-gray-700'
              }`}
              disabled={isLoading}
            />
            {errors.secondName && (
              <p className="text-red-400 text-xs mt-1 ml-1">{errors.secondName}</p>
            )}
          </div>
        </div>
      )}

      {selectedRole === 'employer' && (
        <div className="space-y-4 border-t border-gray-800 pt-4">
          <h3 className="text-white font-medium">Информация о компании</h3>
          
          <div>
            <input
              type="text"
              placeholder="Название компании *"
              value={employerData.companyName}
              onChange={(e) => {
                setEmployerData({ ...employerData, companyName: e.target.value });
                clearFieldError('companyName');
              }}
              className={`w-full bg-gray-800 border rounded-xl p-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent ${
                errors.companyName ? 'border-red-500' : 'border-gray-700'
              }`}
              disabled={isLoading}
            />
            {errors.companyName && (
              <p className="text-red-400 text-xs mt-1 ml-1">{errors.companyName}</p>
            )}
          </div>
          
          <input
            type="text"
            placeholder="Сайт (необязательно)"
            value={employerData.website}
            onChange={(e) => setEmployerData({ ...employerData, website: e.target.value })}
            className="w-full bg-gray-800 border border-gray-700 rounded-xl p-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            disabled={isLoading}
          />
          
          <div>
            <input
              type="text"
              placeholder="ИНН * (10-12 цифр)"
              value={employerData.inn}
              onChange={(e) => {
                setEmployerData({ ...employerData, inn: e.target.value });
                clearFieldError('inn');
              }}
              className={`w-full bg-gray-800 border rounded-xl p-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent ${
                errors.inn ? 'border-red-500' : 'border-gray-700'
              }`}
              disabled={isLoading}
            />
            {errors.inn && (
              <p className="text-red-400 text-xs mt-1 ml-1">{errors.inn}</p>
            )}
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="flex-1 bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
          disabled={isLoading}
        >
          Назад
        </Button>
        <Button
          type="submit"
          className="flex-1 bg-blue-600 hover:bg-blue-700"
          disabled={isLoading}
        >
          {isLoading ? 'Регистрация...' : 'Завершить'}
        </Button>
      </div>
    </form>
  );
};