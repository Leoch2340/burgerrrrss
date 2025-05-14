// Импорт стилей и изображения для успешного завершения заказа
import styles from './order-details.module.css';
import done from '../../images/done.png' // Изображение, указывающее на успешное выполнение заказа
import { useSelector } from '../../services/hooks'; // Хук для доступа к состоянию из Redux store

// Компонент для отображения деталей заказа
export function OrderDetails() {

    // Извлекаем номер заказа из состояния Redux
    const orderNumber = useSelector(state => state.orderDetails.number)

    return (
        <>
            {/* Основной контейнер для отображения деталей заказа */}
            <div className={`${styles.order_details} pl-25 pr-25`}>
                {/* Идентификатор заказа в большом шрифте */}
                <p className={`${styles.order_identifier} text text_type_digits-large mt-30 mb-8`}>{orderNumber}</p>
                {/* Подпись для идентификатора заказа */}
                <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
                {/* Изображение с подтверждением, что заказ принят */}
                <img src={done} className={styles.done} alt="Заказ подтвержден" />
                {/* Описание состояния заказа */}
                <p className="text text_type_main-default mt-15 mb-2">Ваш заказ начали готовить</p>
                {/* Дополнительное сообщение, поясняющее, что нужно ждать */}
                <p className="text text_type_main-default text_color_inactive mb-30">Дождитесь готовности на орбитальной станции</p>
            </div>
        </>
    )
}
