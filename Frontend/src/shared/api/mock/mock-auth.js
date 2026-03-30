export const mockUsers = [
  {
    id: 1,
    email: 'applicant@demo.com',
    password: '123456',
    role: 'applicant',
    profile: {
      firstName: 'Александр',
      lastName: 'Петров',
      secondName: 'Сергеевич',
      university: 'МГУ',
      graduationYear: '2025'
    }
  },
  {
    id: 2,
    email: 'employer@demo.com',
    password: '123456',
    role: 'employer',
    profile: {
      companyName: 'ТехноСофт',
      inn: '7701123456',
      website: 'https://technosoft.ru'
    }
  },
  {
    id: 3,
    email: 'admin@demo.com',
    password: '123456',
    role: 'curator',
    isSuperAdmin: false,
    profile: {
      fullName: 'Иван Иванов'
    }
  },
  {
    id: 4,
    email: 'superadmin@demo.com',
    password: '123456',
    role: 'curator',
    isSuperAdmin: true,
    profile: {
      fullName: 'Алексей Алексеев'
    }
  }
];

export const mockLogin = (email, password) => {
  const user = mockUsers.find(u => u.email === email && u.password === password);
  if (user) {
    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        profile: user.profile
      }
    };
  }
  return { success: false, error: 'Неверный email или пароль' };
};

export const mockRegister = (userData, role, profileData) => {
  const existingUser = mockUsers.find(u => u.email === userData.email);
  if (existingUser) {
    return { success: false, error: 'Пользователь с таким email уже существует' };
  }
  
  const newUser = {
    id: mockUsers.length + 1,
    email: userData.email,
    password: userData.password,
    role: role,
    profile: profileData
  };
  
  mockUsers.push(newUser);
  
  return {
    success: true,
    user: {
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
      profile: newUser.profile
    }
  };
};