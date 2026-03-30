// src/widgets/main-map/balloonStyles.js
export const injectBalloonStyles = () => {
  if (document.getElementById('balloon-styles')) return;

  const style = document.createElement('style');
  style.id = 'balloon-styles';
  style.textContent = `
    .custom-balloon {
      background: #1a1e2b;
      border-radius: 28px;
      padding: 12px 16px;
      width: 260px;
      box-shadow: 0 20px 35px rgba(0, 0, 0, 0.5);
      font-family: 'Inter', sans-serif;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    .balloon-title {
      font-weight: 700;
      font-size: 1rem;
      color: white;
      margin-bottom: 4px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .balloon-title span {
      color: #ff4444;
      font-size: 1.2rem;
    }
    .balloon-company {
      font-size: 0.8rem;
      color: rgba(255, 255, 255, 0.7);
      margin-bottom: 8px;
    }
    .balloon-skills {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 8px;
    }
    .balloon-skill {
      background: rgba(255, 255, 255, 0.15);
      border-radius: 30px;
      padding: 2px 8px;
      font-size: 0.7rem;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.9);
    }
    .balloon-salary {
      font-weight: 700;
      color: #2ecc71;
      font-size: 0.85rem;
      margin-bottom: 8px;
    }
    .balloon-button {
      background: rgba(255, 255, 255, 0.1);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 30px;
      padding: 4px 12px;
      font-size: 0.7rem;
      cursor: pointer;
      width: 100%;
      transition: background 0.15s;
    }
    .balloon-button:hover {
      background: rgba(255, 255, 255, 0.2);
    }
    .ymaps-2-1-79-balloon__close,
    .ymaps-2-1-79-balloon__close-button {
      display: none !important;
    }
    .ymaps-2-1-79-balloon__content {
      padding: 0 !important;
      background: transparent !important;
    }
    .ymaps-2-1-79-balloon {
      background: transparent !important;
      box-shadow: none !important;
      border: none !important;
    }
    .ymaps-2-1-79-balloon__tail {
      display: none !important;
    }
  `;
  document.head.appendChild(style);
};