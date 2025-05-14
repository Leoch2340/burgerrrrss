// Импорт типа FC (Functional Component) из React
import { FC } from 'react';

// Импорт CSS-модуля для стилизации компонента
import styles from './burger-ingredients-item.module.css';

// Импорт компонента счётчика и иконки валюты из библиотеки компонентов Яндекс Практикума
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

// Импорт хуков для получения данных из Redux store и для dispatch'а действий
import { useSelector, useDispatch } from '../../services/hooks';

// Импорт действия для добавления деталей ингредиента в Redux store
import { addIngredientDetails } from '../../services/actions/ingredient-details';

// Импорт хука useDrag для реализации перетаскивания ингредиента
import { useDrag } from 'react-dnd';

// Импорт useMemo для оптимизации вычислений
import { useMemo } from 'react';

// Импорт компонентов для маршрутизации
import { Link, useLocation } from 'react-router-dom';

// Импорт типа пропсов компонента
import { TBurgerIngredientsItem } from '../../services/types/types';

// Определение и экспорт компонента BurgerIngredientsItem
export const BurgerIngredientsItem: FC<TBurgerIngredientsItem> = ({ ingredient }) => {
    // Получение текущего location для реализации модального перехода
    const location = useLocation();

    // Получение текущих добавленных ингредиентов из Redux store
    const main = useSelector(state => state.burgerConstructor.mainList);
    const buns = useSelector(state => state.burgerConstructor.bunsList);

    // Вычисление количества ингредиента в заказе (булка считается дважды — верх и низ)
    const counter = useMemo(() => (
        main.filter((item) => item._id === ingredient._id).length || buns.filter((item) => item._id === ingredient._id).length * 2
    ), [main, buns, ingredient._id]);

    // Получение функции dispatch из Redux
    const dispatch = useDispatch();

    // Обработчик клика по ингредиенту — сохраняет его детали в Redux store
    const handleIngredientClick = () => {
        dispatch(addIngredientDetails(ingredient))
    }

    // Реализация перетаскивания ингредиента с помощью useDrag
    const [, dragIngredient] = useDrag(() => ({
        type: 'ingredient', // Тип для DnD
        item: {
            ingredient, // Передаём объект ингредиента
            id: ingredient._id,
            type: ingredient.type
        },
    }), [])

    return (
        // Контейнер ингредиента, привязанный к drag-ссылке и клику
        <article className={styles.item} onClick={handleIngredientClick} ref={dragIngredient}>
            {/* Обёртка Link для открытия модального окна по маршруту ингредиента */}
            <Link to={{
                pathname: `/ingredients/${ingredient._id}`,
                state: { background: location } // Для открытия модального окна поверх текущей страницы
            }}
                className={styles.link}>
                
                {/* Отображение счётчика, если ингредиент уже добавлен */}
                {counter > 0 ? <Counter count={counter} size="default" /> : null}

                {/* Картинка ингредиента */}
                <img className="ml-4 mr-4" src={ingredient.image} alt={ingredient.name} />

                {/* Блок с ценой и иконкой валюты */}
                <div className={`${styles.price} mt-1 mb-2`}>
                    <p className="text text_type_digits-default">{ingredient.price}</p>
                    <CurrencyIcon type="primary" />
                </div>

                {/* Название ингредиента */}
                <p className={`${styles.subtitle} text text_type_main-default`}>{ingredient.name}</p>
            </Link>
        </article>
    )
}
