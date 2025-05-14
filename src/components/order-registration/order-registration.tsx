import { FC } from "react"; // Импорт функционального компонента (FC) из React для типизации компонентов
import styles from './order-registration.module.css'; // Импорт стилей из CSS-модуля для компонента
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'; // Импорт компонентов Button и CurrencyIcon из библиотеки для использования в интерфейсе
import { useMemo } from 'react'; // Импорт хука useMemo для мемоизации значений
import { useSelector } from '../../services/hooks'; // Импорт хука useSelector для доступа к состоянию Redux
import { TOrderRegistration } from '../../services/types/types'; // Импорт типа пропсов для компонента

export const OrderRegistration: FC<TOrderRegistration> = ({ handleOrderClick }) => { // Основной функциональный компонент, принимающий функцию handleOrderClick как пропс

    const main = useSelector(state => state.burgerConstructor.mainList); // Получаем список ингредиентов, добавленных в основную часть бургера, из состояния Redux
    const buns = useSelector(state => state.burgerConstructor.bunsList); // Получаем список булочек, добавленных в состояние Redux

    const totalOrderAmount = useMemo(() => ( // Мемоизируем расчет общей стоимости заказа, чтобы избежать лишних перерасчетов
        main.reduce((acc, { price }) => acc + price, 0) + (buns.reduce((acc, { price }) => acc + price, 0) * 2) // Суммируем стоимость всех ингредиентов из основной части и булочек (учитываем булочки по 2 раза)
    ), [main, buns]); // Хук useMemo пересчитывает стоимость, только если изменяются main или buns

    return ( // Возвращаем JSX-разметку компонента
        <>
            <div className={`${styles.order_registration} mt-10 mr-4`}> {/* Контейнер с дополнительными отступами */}
                <div className={styles.order_cost}> {/* Блок с отображением стоимости заказа */}
                    <p className="text text_type_digits-medium mr-2">{totalOrderAmount}</p> {/* Отображаем общую стоимость заказа */}
                    <CurrencyIcon type="primary" /> {/* Иконка валюты */}
                </div>
                <Button onClick={handleOrderClick} type="primary" size="large" htmlType="submit">Оформить заказ</Button> {/* Кнопка для оформления заказа, которая вызывает handleOrderClick при клике */}
            </div>
        </>
    )
}
