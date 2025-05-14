import React from 'react'; // Импорт React для работы с JSX
import styles from './order-user.module.css'; // Импорт стилей из CSS-модуля для компонента
import { useSelector } from '../../services/hooks'; // Импорт хука useSelector для работы с состоянием Redux
import { useParams } from 'react-router-dom'; // Импорт useParams для получения параметров URL
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'; // Импорт компонента CurrencyIcon для отображения валюты
import { dateWhen, dateFormat } from '../../utils/date'; // Импорт утилит для работы с датами

// Функция для фильтрации элементов, которые не равны undefined
function inNotUndefined<T>(item: T | undefined): item is T {
    return item !== undefined;
}

export const OrderUser = () => { // Основной компонент OrderUser

    const ingredients = useSelector((store) => store.burgerIngredients.burgerIngredients); // Получаем список ингредиентов из состояния Redux
    const orders = useSelector((store) => store.webSocketUser.orders); // Получаем список заказов пользователя из состояния Redux
    const { id } = useParams<{ id: string }>(); // Получаем id заказа из параметров URL
    const order = React.useMemo(() => { // Ищем нужный заказ по id
        return orders.find(order => order._id === id);
    }, [orders, id]);

    const orderIngredientsForImage = ingredients.filter((ingredient) => order?.ingredients.includes(ingredient._id)); // Фильтруем ингредиенты, которые есть в заказе для отображения изображений

    const orderIngredients = 
        order?.ingredients.map(id => { // Маппим идентификаторы ингредиентов в массив объектов ингредиентов
            return ingredients.find(item => item._id === id); // Ищем ингредиент по id
        }).filter(inNotUndefined); // Фильтруем, чтобы исключить undefined элементы

    const totalOrderPrice = orderIngredients?.reduce( // Вычисляем общую стоимость заказа
        (acc, ingredient) => acc + ingredient.price, // Складываем цену всех ингредиентов
        0
    );

    if (!order) { // Если заказ не найден, возвращаем null (не показываем компонент)
        return null;
    }

    const when = dateWhen(new Date(order.createdAt)); // Форматируем дату создания заказа

    return ( // Возвращаем JSX разметку компонента
        <div className={styles.order_info}> 
            <p className='text text_type_digits-default'>#{order?.number}</p> {/* Отображаем номер заказа */}
            <p className={`${styles.title} text text_type_main-medium mt-10`}>{order?.name}</p> {/* Отображаем название заказа */}
            <p className={`${styles.status} text text_type_main-default mt-3`}>{order?.status === 'done' ? 'Выполнен' : 'Готовится'}</p> {/* Статус заказа (готовится или выполнен) */}
            <p className={`${styles.title} text text_type_main-medium mt-15`}>Состав:</p> {/* Заголовок для списка ингредиентов */}
            <ul className={styles.scroll}> {/* Список ингредиентов */}
                {orderIngredientsForImage!
                    .map((item) =>
                        <li className={styles.item} key={item._id}> {/* Отображаем каждый ингредиент */}
                            <img className={styles.image} src={item.image_mobile} alt={item.name} /> {/* Изображение ингредиента */}
                            <p className={`${styles.text} text_type_main-default`}>{item.name}</p> {/* Название ингредиента */}
                            <p className={`${styles.price} text text_type_digits-default`}>
                                {orderIngredients?.filter(i => i._id === item._id).length} x {item.price} <CurrencyIcon type='primary' /> {/* Количество и цена ингредиента */}
                            </p>
                        </li>
                    )}
            </ul>
            <div className={`${styles.total} mt-10 mb-10`}>
                <p className="text text_type_main-default text_color_inactive">
                    {`${when}, ${dateFormat(order!.createdAt)}`} {/* Дата и время создания заказа */}
                </p>
                <div className={`${styles.total_price} mt-1 mb-2`}>
                    <p className="text text_type_digits-default">{totalOrderPrice}</p> {/* Общая цена заказа */}
                    <CurrencyIcon type="primary" /> {/* Иконка валюты */}
                </div>
            </div>
        </div>
    );
}
