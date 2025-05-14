import { useEffect } from "react"; // Импорт хука useEffect для выполнения побочных эффектов в компоненте
import { useDispatch } from '../services/hooks'; // Импорт хука useDispatch для отправки действий в Redux
import styles from './pages.module.css'; // Импорт CSS-модулей для стилизации компонента
import { OrderFeed } from '../components/order-feed/order-feed'; // Импорт компонента для отображения ленты заказов
import { Orders } from '../components/orders/orders'; // Импорт компонента для отображения списка заказов
import { wsConnectionStart, wsConnectionClosed } from '../services/actions/websockets'; // Импорт действий для начала и закрытия WebSocket-соединения

export const Feed = () => { // Объявление компонента Feed
    const dispatch = useDispatch(); // Получение dispatch для отправки действий в Redux

    useEffect(() => { // useEffect для запуска WebSocket-соединения при монтировании компонента
        dispatch(wsConnectionStart()); // Отправка действия для начала соединения WebSocket
        return () => { // Очистка ресурса при размонтировании компонента
            dispatch(wsConnectionClosed()); // Отправка действия для закрытия соединения WebSocket
        };
    }, []); // Пустой массив зависимостей, эффект выполнится только при монтировании и размонтировании компонента

    return (
        <section className={styles.content}> {/* Разметка для секции, которая содержит ленту заказов и список заказов */}
            <OrderFeed /> {/* Компонент, отображающий ленту заказов */}
            <Orders /> {/* Компонент, отображающий список заказов */}
        </section>
    )
}
