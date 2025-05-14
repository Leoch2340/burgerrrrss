// Импортируем необходимые хуки и стили
import { useSelector } from '../../services/hooks'; // Хук для доступа к данным из Redux
import styles from './order-feed.module.css'; // Стили для компонента ленты заказов
import { OrderItem } from '../order-item/order-item'; // Компонент для отображения отдельного заказа

// Компонент для отображения ленты заказов
export function OrderFeed() {

    // Извлекаем список заказов из состояния Redux с использованием useSelector
    const orders = useSelector(state => state.webSocket.orders)

    return (
        <section>
            {/* Заголовок для секции ленты заказов */}
            <h2 className="text text_type_main-large mt-10 mb-5">Лента заказов</h2>
            {/* Список заказов, прокручиваемый горизонтально */}
            <ul className={`${styles.scroll} pr-2`}>
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
