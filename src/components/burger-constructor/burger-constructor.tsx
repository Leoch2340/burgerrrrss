// Импорт React
import React from 'react';
// Импорт стилей из CSS-модуля
import styles from './burger-constructor.module.css';
// Импорт компонента для отображения ингредиента в заказе
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
// Импорт кнопки оформления заказа
import { OrderRegistration } from '../order-registration/order-registration';
// Импорт хука drag-and-drop для работы с перетаскиванием ингредиентов
import { useDrop } from 'react-dnd';
// Импорт генератора уникальных id
import { nanoid } from 'nanoid';
// Импорт экшенов для работы с конструктором
import { setBun, addIngredient } from '../../services/actions/burger-constructor';
// Импорт хуков `useSelector` и `useDispatch`
import { useSelector, useDispatch } from '../../services/hooks';
// Импорт хука для перехода по маршрутам
import { useHistory } from 'react-router-dom';
// Импорт кастомного элемента ингредиента внутри конструктора
import { BurgerConstructorElement } from '../burger-constructor-element/burger-constructor-element';
// Импорт экшена для удаления ингредиента
import { deleteIngredient } from '../../services/actions/burger-constructor';
// Импорт экшена для получения данных о заказе
import { getOrderDetails } from '../../services/actions/order-details';
// Импорт компонента модального окна
import { Modal } from '../modal/modal';
// Импорт компонента с деталями заказа
import { OrderDetails } from '../order-details/order-details';
// Импорт типов ингредиентов и элемента
import { TIngredientType, TItem } from '../../services/types/types';

export function BurgerConstructor() {
    // Получение dispatch-функции
    const dispatch = useDispatch()
    // Хук для навигации по маршрутам
    const history = useHistory()

    // Получение основных ингредиентов из store
    const main = useSelector(state => state.burgerConstructor.mainList)
    // Получение выбранных булочек
    const buns = useSelector(state => state.burgerConstructor.bunsList)

    // Получение списка ID ингредиентов
    const idMainList = (main.map((item) => item._id))
    const idBunsList = (buns.map((item) => item._id))
    const idIngredientsList = idMainList.concat(idBunsList).concat(idBunsList) // Булочка нужна дважды: верх и низ

    console.log(idIngredientsList) // Отладка

    // Проверка авторизации пользователя
    const authorization = useSelector((state) => state.userAuthorization.authorization);

    // Локальный стейт: открыто ли модальное окно
    const [openModal, setOpenModal] = React.useState(false);

    // Обработка нажатия на кнопку "Оформить заказ"
    const handleOrderClick = () => {
        if (!authorization) {
            // Если не авторизован — перенаправляем на логин
            history.replace('/login?retpath=/')
        } else {
            // Если авторизован — открываем модалку и делаем запрос на оформление заказа
            setOpenModal(!openModal)
            dispatch(getOrderDetails(idIngredientsList))
        }
    }

    // Закрытие модального окна
    const closeModal = () => {
        setOpenModal(!openModal);
    }

    // Настройка зоны для "дропа" ингредиентов
    const [, dropIngredient] = useDrop(() => ({
        accept: 'ingredient', // Принимаем только ингредиенты
        drop: ((item: TItem) => addElement(item.ingredient)) // При дропе добавляем элемент
    }))

    // Функция добавления ингредиента (с проверкой типа)
    const addElement = (element: TIngredientType) => {
        element = { ...element, id: nanoid() } // Добавляем уникальный id
        if (element.type === 'bun') {
            dispatch(setBun(element)) // Булочку — в специальный редьюсер
        }
        if (element.type !== 'bun') {
            dispatch(addIngredient(element)) // Остальные — в основной список
        }
    }

    // Удаление ингредиента
    const deleteElement = (element: TIngredientType) => {
        dispatch(deleteIngredient(element))
    }

    return (
        // Основная секция конструктора, с передачей ссылки в drop-зону
        <section className={`${styles.burger_constructor} mt-25`} ref={dropIngredient}>
            <ul className={`${styles.order_list} pl-3`}>
                {/* Верхняя булочка */}
                {buns.map((element) => {
                    if (element.type === 'bun')
                        return (
                            <li className={`${styles.default_ingredient} mb-4 ml-8`} key={element.id}>
                                <ConstructorElement
                                    type="top"
                                    isLocked={true} // Булку нельзя перетаскивать
                                    text={`${element.name} (верх)`}
                                    price={element.price}
                                    thumbnail={element.image}
                                />
                            </li>
                        )
                })}

                {/* Прокручиваемый список ингредиентов */}
                <div className={`${styles.scroll} pr-2`}>
                    {main.map((element, index) => {
                        if (element.type !== 'bun')
                            return (
                                <BurgerConstructorElement
                                    element={element}
                                    index={index}
                                    id={element.id}
                                    key={element.id}
                                    deleteElement={deleteElement}
                                />
                            )
                    })}
                </div>

                {/* Нижняя булочка */}
                {buns.map((element) => {
                    if (element.type === 'bun')
                        return (
                            <li className={`${styles.default_ingredient} mt-4 ml-8`} key={element.id}>
                                <ConstructorElement
                                    type="bottom"
                                    isLocked={true}
                                    text={`${element.name} (низ)`}
                                    price={element.price}
                                    thumbnail={element.image}
                                />
                            </li>
                        )
                })}
            </ul>

            {/* Кнопка "Оформить заказ", если булка выбрана */}
            {buns.length > 0 ?
                <OrderRegistration handleOrderClick={handleOrderClick} />
                : null}

            {/* Модальное окно с деталями заказа */}
            {openModal && (
                <Modal onClose={closeModal}>
                    <OrderDetails />
                </Modal>
            )}
        </section>
    )
}
