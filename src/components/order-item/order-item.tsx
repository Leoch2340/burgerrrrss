import { FC } from 'react'; // Импорт типа FC (Functional Component) из React для типизации функциональных компонентов
import { useSelector } from '../../services/hooks'; // Импорт хука useSelector для доступа к состоянию Redux
import styles from './order-item.module.css'; // Импорт стилей из CSS-модуля
import { Link, useLocation } from 'react-router-dom'; // Импорт компонентов Link и useLocation из react-router-dom для навигации
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'; // Импорт иконки валюты для отображения стоимости
import { dateWhen, dateFormat } from '../../utils/date'; // Импорт утилит для работы с датами
import { TOrderProps } from '../../services/types/types'; // Импорт типа для пропсов компонента заказа

function inNotUndefined<T>(item: T | undefined): item is T { // Функция для проверки, что элемент не является undefined
    return item !== undefined; // Возвращаем true, если item не undefined
}

export const OrderItem: FC<TOrderProps> = ({ order }) => { // Функциональный компонент, принимающий объект order как пропс

    const location = useLocation(); // Получаем текущий путь из URL с помощью хука useLocation

    const ingredients = useSelector((store) => store.burgerIngredients.burgerIngredients); // Получаем список всех ингредиентов из состояния Redux
    const orderIngredientsForImage = ingredients.filter((ingredient) => order.ingredients.includes(ingredient._id)); // Фильтруем ингредиенты для отображения их изображений в заказе
    const orderIngredientsForTotal =
        order.ingredients.map(id => { // Маппим ID ингредиентов заказа в список объектов ингредиентов
            return ingredients.find(item => item._id === id); // Ищем каждый ингредиент по его ID
        }).filter(inNotUndefined); // Убираем undefined значения

    const totalOrderPrice = orderIngredientsForTotal.reduce( // Вычисляем общую цену заказа
        (acc, ingredient) => acc + ingredient.price, // Суммируем цену каждого ингредиента
        0 // Начальное значение суммы
    );

    const when = dateWhen(new Date(order.createdAt)); // Форматируем дату создания заказа с помощью функции dateWhen

    return ( // Возвращаем JSX-разметку для компонента
        <article className={`${styles.item} pt-6 pr-6 pb-6 pl-6`}> {/* Основной контейнер с применением стилей */}
           
            <Link to={{  // Ссылка, которая ведет на страницу с деталями заказа
                pathname: location.pathname === '/feed'  ? `/feed/${order._id}` : `/profile/orders/${order._id}`, // В зависимости от текущего пути формируем путь для перехода
                state: { background: location }, // Передаем состояние с фоновым путем для отображения модального окна
            }}
                className={styles.link}> {/* Стилизация ссылки */}
                <div className={styles.order}> {/* Контейнер для информации о заказе */}
                    <p className="text text_type_digits-default">{order.number}</p> {/* Номер заказа */}
                    <p className="text text_type_main-default text_color_inactive">
                        {`${when}, ${dateFormat(order.createdAt)}`} {/* Форматированная дата создания заказа */}
                    </p>
                </div>
                <p className={`${styles.text} text text_type_main-medium`}>{order.name}</p> {/* Название заказа */}
                <div className={styles.order_info}> {/* Контейнер для информации о составе заказа */}
                    <ul className={styles.list}> {/* Список ингредиентов */}
                        {orderIngredientsForImage
                            .slice(0, 6) // Ограничиваем вывод первыми 6 ингредиентами
                            .map((item) => // Отображаем ингредиенты
                                <li className={styles.list_item} key={item._id}> {/* Каждый ингредиент */}
                                    <img className={styles.list_image} src={item.image_mobile} alt={item.name} /> {/* Изображение ингредиента */}
                                </li>
                            )}
                    </ul>
                    <div className={`${styles.price} mt-1 mb-2`}> {/* Блок с общей стоимостью заказа */}
                        <p className="text text_type_digits-default">{totalOrderPrice}</p> {/* Общая цена заказа */}
                        <CurrencyIcon type="primary" /> {/* Иконка валюты */}
                    </div>
                </div>
            </Link>
        </article> // Закрытие основного элемента
    )
}
