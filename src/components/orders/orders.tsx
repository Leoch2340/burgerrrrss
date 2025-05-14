import styles from './orders.module.css'; // Импорт стилей из CSS-модуля для компонента
import { useSelector } from '../../services/hooks'; // Импорт хука useSelector для работы с состоянием Redux

export function Orders() { // Основной компонент Orders

    const { orders, total, totalToday } = useSelector(state => state.webSocket); // Получаем заказы, общее количество и количество за сегодня из состояния Redux

    return (
        <section className={`${styles.orders} ml-4 mt-25`}> {/* Разметка секции заказов с отступами */}
            <div className={styles.orders_status}> {/* Блок для статусов заказов */}
                <div className={styles.title}> {/* Заголовок для списка готовых заказов */}
                    <h3 className="text text_type_main-medium">Готовы:</h3> {/* Заголовок "Готовы" */}
                    <ul className={styles.list}> {/* Список готовых заказов */}
                        {orders && orders.slice(0, 30) // Ограничиваем список до 30 заказов
                            .map((order) => { // Перебираем заказы
                                if (order.status === 'done') { // Если статус заказа "done"
                                    return (
                                        <li key={order._id} className={`${styles.done} text text_type_digits-default`} >{order.number}</li> // Отображаем номер заказа
                                    )
                                }
                            })}
                    </ul>
                </div>
                <div className={styles.title}> {/* Заголовок для списка заказов в работе */}
                    <h3 className="text text_type_main-medium">В работе:</h3> {/* Заголовок "В работе" */}
                    <ul className={styles.list}> {/* Список заказов в работе */}
                        {orders.map((order) => { // Перебираем все заказы
                            if (order.status === 'pending') { // Если статус заказа "pending"
                                return (
                                    <li key={order._id} className="text text_type_digits-default" >{order.number}</li> // Отображаем номер заказа
                                )
                            }
                        })}
                    </ul>
                </div>
            </div>
            <div> {/* Блок для отображения общего количества выполненных заказов */}
                <h3 className="text text_type_main-medium">Выполнено за все время:</h3> {/* Заголовок "Выполнено за все время" */}
                <p className={`${styles.counter} text text_type_digits-large`}>{total}</p> {/* Общая сумма выполненных заказов */}
            </div>
            <div> {/* Блок для отображения количества выполненных заказов за сегодня */}
                <h3 className="text text_type_main-medium">Выполнено за сегодня:</h3> {/* Заголовок "Выполнено за сегодня" */}
                <p className={`${styles.counter} text text_type_digits-large`}>{totalToday}</p> {/* Количество выполненных заказов за сегодня */}
            </div>
        </section>
    )
}
