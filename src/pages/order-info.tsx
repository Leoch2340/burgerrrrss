import { useEffect } from 'react'; // Импорт хука useEffect для работы с побочными эффектами
import { useDispatch } from '../services/hooks'; // Импорт хука useDispatch для диспатча действий в Redux
import styles from './pages.module.css'; // Импорт стилей для компонента, определённых в CSS-модуле
import { Order } from '../components/order/order'; // Импорт компонента для отображения информации о заказе
import { wsConnectionStart, wsConnectionClosed } from '../services/actions/websockets'; // Импорт действий для установки и закрытия WebSocket-соединения

export const OrderInfo = () => { // Компонент, отображающий информацию о заказе
    const dispatch = useDispatch(); // Инициализация диспетчера Redux

    useEffect(() => { // Эффект, который будет вызываться при монтировании компонента
        dispatch(wsConnectionStart()); // Запуск WebSocket-соединения
        return () => { // Очистка при размонтировании компонента
            dispatch(wsConnectionClosed()); // Закрытие WebSocket-соединения
        };
    }, []); // Пустой массив зависимостей означает, что эффект выполнится только при монтировании и размонтировании компонента

    return (
        <div className={styles.info}> {/* Обертка для отображения информации о заказе с применением стилей */}
            <Order /> {/* Компонент для отображения информации о заказе */}
        </div>
    )
}
