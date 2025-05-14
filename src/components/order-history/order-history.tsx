// Импортируем необходимые хуки и стили
import styles from './order-history.module.css'; // Стили для компонента истории заказов
import { useSelector } from '../../services/hooks'; // Хук для доступа к данным из Redux
import { OrderItem } from '../order-item/order-item'; // Компонент для отображения отдельного заказа

// Компонент для отображения истории заказов пользователя
export function OrderHistory() {

    // Извлекаем список заказов пользователя из состояния Redux и инвертируем порядок с помощью reverse()
    const orders = useSelector(state => [...state.webSocketUser.orders].reverse())

    return (
        <section>
            {/* Список заказов, прокручиваемый горизонтально */}
            <ul className={`${styles.scroll} `}>
                {orders
                    // Для каждого заказа рендерим компонент OrderItem
                    .map((order) =>
                        <li key={order._id}>
                            <OrderItem order={order} />
                        </li>
                    )}
            </ul>
        </section>
    )
}
