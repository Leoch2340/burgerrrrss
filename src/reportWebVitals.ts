// Импорт типа ReportHandler из библиотеки web-vitals
import { ReportHandler } from 'web-vitals';

// Функция для сбора и передачи метрик производительности (если передан обработчик)
const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  // Проверка: передана ли функция обратного вызова и является ли она функцией
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Динамический импорт функций метрик из web-vitals
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Передача метрик в функцию-обработчик
      getCLS(onPerfEntry);   // Cumulative Layout Shift
      getFID(onPerfEntry);   // First Input Delay
      getFCP(onPerfEntry);   // First Contentful Paint
      getLCP(onPerfEntry);   // Largest Contentful Paint
      getTTFB(onPerfEntry);  // Time to First Byte
    });
  }
};

// Экспорт функции по умолчанию
export default reportWebVitals;
