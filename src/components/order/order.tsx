// Импорт необходимых зависимостей и стилей
import React from 'react';
import styles from './order.module.css'
import { useSelector } from '../../services/hooks'; // Хуки для работы с состоянием из Redux
import { useParams } from 'react-router-dom'; // Хук для получения параметров URL
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'; // Иконка валюты
import { dateWhen, dateFormat } from '../../utils/date'; // Функции для форматирования даты

// Типизация для проверки, что значение не является undefined
function inNotUndefined<T>(item: T | undefined): item is T {
    return item !== undefined
}

// Основной компонент Order
export const Order = () => {

    // Получаем ингредиенты и заказы из Redux store
    const ingredients = useSelector((store) => store.burgerIngredients.burgerIngredients);
    const orders = useSelector((store) => store.webSocket.orders);
    const { id } = useParams<{ id: string }>(); // Получаем параметр id из URL

    // Используем useMemo для получения конкретного заказа по id
    const order = React.useMemo(() => {
        return orders.find(order => order._id === id)
    }, [orders, id])

    // Отфильтровываем ингредиенты, которые входят в этот заказ
    const orderIngredientsForImage = ingredients.filter((ingredient) => order?.ingredients.includes(ingredient._id))

    // Находим все ингредиенты по их id и фильтруем только те, которые существуют
    const orderIngredients =
        order?.ingredients.map(id => {
            return ingredients.find(item => item._id === id);
        }).filter(inNotUndefined);

    // Рассчитываем общую стоимость заказа
    const totalOrderPrice = orderIngredients?.reduce(
        (acc, ingredient) => acc + ingredient.price,
        0
    );

    // Если заказ не найден, возвращаем null (ничего не показываем)
    if (!order) {
        return null
    }

    // Форматируем дату создания заказа
    const when = dateWhen(new Date(order.createdAt))

    return (
        <div className={styles.order_info}>
            {/* Номер заказа */}
            <p className='text text_type_digits-default'>#{order?.number}</p>
            {/* Название заказа */}
            <p className={`${styles.title} text text_type_main-medium mt-10`}>{order?.name}</p>
            {/* Статус заказа */}
            <p className={`${styles.status} text text_type_main-default mt-3`}>{order?.status === 'done' ? 'Выполнен' : 'Готовится'}</p>
            {/* Состав заказа */}
            <p className={`${styles.title} text text_type_main-medium mt-15`}>Состав:</p>
            <ul className={styles.scroll}>
                {orderIngredientsForImage!
                    .map((item) =>
                        // Отображаем каждый ингредиент в списке
                        <li className={styles.item} key={item._id}>
                            <img className={styles.image} src={item.image_mobile} alt={item.name} />
                            <p className={`${styles.text} text_type_main-default`}>{item.name}</p>
                            {/* Отображаем количество и цену для каждого ингредиента */}
                            <p className={`${styles.price} text text_type_digits-default`}>
                                {orderIngredients?.filter(i => i._id === item._id).length} x {item.price} <CurrencyIcon type='primary' /></p>
                        </li>
                    )}

            </ul>
            {/* Информация о времени заказа и общей стоимости */}
            <div className={`${styles.total} mt-10 mb-10`}>
                <p className="text text_type_main-default text_color_inactive">
                    {`${when}, ${dateFormat(order!.createdAt)}`}
                </p>
                <div className={`${styles.total_price} mt-1 mb-2`}>
                    <p className="text text_type_digits-default">{totalOrderPrice}</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    )
}
