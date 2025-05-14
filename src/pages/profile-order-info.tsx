import { useEffect } from "react"; // Импорт хука useEffect для работы с побочными эффектами
import styles from './pages.module.css'; // Импорт стилей для компонента, определённых в CSS-модуле
import { useDispatch } from '../services/hooks'; // Импорт хука useDispatch для диспатча действий в Redux
import { wsConnectionStartUser, wsConnectionClosedUser } from '../services/actions/websockets'; // Импорт действий для начала и закрытия WebSocket-соединения для пользователя
import { OrderUser } from "../components/order-user/order-user"; // Импорт компонента для отображения информации о заказах пользователя

export const ProfileOrderInfo = () => { // Компонент для отображения информации о заказах пользователя
    const dispatch = useDispatch(); // Инициализация диспетчера Redux

    useEffect(() => { // Эффект, который будет вызываться при монтировании компонента
        dispatch(wsConnectionStartUser()); // Запуск WebSocket-соединения для пользователя
        return () => { // Очистка при размонтировании компонента
            dispatch(wsConnectionClosedUser()); // Закрытие WebSocket-соединения для пользователя
        };
    }, []); // Пустой массив зависимостей означает, что эффект выполнится только при монтировании и размонтировании компонента

    return (
        <div className={styles.info}> {/* Обертка для отображения информации о заказах пользователя с применением стилей */}
            <OrderUser /> {/* Компонент для отображения информации о заказах пользователя */}
        </div>
    )
}
