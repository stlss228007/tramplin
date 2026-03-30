/**
 * Форматирует зарплату для отображения
 * @param {number|null} min - Минимальная зарплата
 * @param {number|null} max - Максимальная зарплата
 * @returns {string} Отформатированная строка с зарплатой
 */
export const formatSalary = (min, max) => {
  if (min && max) {
    return `${min.toLocaleString()} – ${max.toLocaleString()} ₽`;
  }
  if (min) {
    return `от ${min.toLocaleString()} ₽`;
  }
  if (max) {
    return `до ${max.toLocaleString()} ₽`;
  }
  return 'з/п не указана';
};

/**
 * Форматирует дату в формате "день месяц год"
 * @param {string|null} date - ISO строка с датой
 * @returns {string} Отформатированная дата или пустая строка
 */
export const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

/**
 * Форматирует время для уведомлений
 * @param {string} dateString - ISO строка с датой
 * @returns {string} Отформатированная строка времени
 */
export const formatNotificationTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) {
    const lastDigit = diffMins % 10;
    const lastTwoDigits = diffMins % 100;
    let word = 'минут';
    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
      word = 'минут';
    } else if (lastDigit === 1) {
      word = 'минуту';
    } else if (lastDigit >= 2 && lastDigit <= 4) {
      word = 'минуты';
    }
    return `${diffMins} ${word} назад`;
  }
  
  if (diffHours < 24) {
    const lastDigit = diffHours % 10;
    const lastTwoDigits = diffHours % 100;
    let word = 'часов';
    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
      word = 'часов';
    } else if (lastDigit === 1) {
      word = 'час';
    } else if (lastDigit >= 2 && lastDigit <= 4) {
      word = 'часа';
    }
    return `${diffHours} ${word} назад`;
  }
  
  const lastDigit = diffDays % 10;
  const lastTwoDigits = diffDays % 100;
  let word = 'дней';
  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    word = 'дней';
  } else if (lastDigit === 1) {
    word = 'день';
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    word = 'дня';
  }
  return `${diffDays} ${word} назад`;
};