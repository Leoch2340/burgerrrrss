// Импорт React
import React from 'react';
// Импорт ReactDOM для работы с корневым DOM-узлом
import ReactDOM from 'react-dom/client';
// Импорт глобальных стилей
import './index.css';
// Импорт главного компонента приложения
import { App } from './components/app/app';
// Импорт функции для сбора показателей производительности
import reportWebVitals from './reportWebVitals';
// Импорт провайдера Redux для подключения стора ко всему приложению
import { Provider } from 'react-redux';
// Импорт глобального Redux стора
import { store } from './services/store';
// Импорт роутера для работы с маршрутизацией
import { BrowserRouter as Router } from 'react-router-dom';

// Получение корневого элемента из HTML и создание корневого React-узла
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLDivElement // утверждение, что элемент с id 'root' — это HTMLDivElement
);

// Рендеринг React-приложения
root.render(
  // Обёртка маршрутизации, указывающая базовый путь приложения
  <Router basename='/react-burger'>
    {/* Обёртка Redux, предоставляющая доступ к стору во всем приложении */}
    <Provider store={store}>
      {/* Обёртка StrictMode помогает выявлять потенциальные проблемы */}
      <React.StrictMode>
        {/* Рендер главного компонента */}
        <App />
      </React.StrictMode>
    </Provider>
  </Router>
);

// Вызов функции сбора метрик производительности (можно передать callback или отправлять на сервер)
reportWebVitals();
