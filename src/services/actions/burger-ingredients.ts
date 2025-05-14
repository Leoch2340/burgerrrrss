import { apiBurger } from "../../utils/api"; // Импорт функции apiBurger для отправки запросов на сервер
import { GET_BURGER_INGREDIENTS_SUCCESS } from "../constants/constants"; // Импорт константы для типа действия (получение ингредиентов)
import { AppThunk, TIngredientType } from "../types/types"; // Импорт типов для Thunk и типа ингредиента
import { IGetBurgerIngredientsSuccess } from "./interfaces"; // Импорт интерфейса для действия с успешным получением ингредиентов

// Создание действия для успешного получения ингредиентов бургера
export const getBurgerIngredientsSuccess = (data: Array<TIngredientType>): IGetBurgerIngredientsSuccess => ({
    type: GET_BURGER_INGREDIENTS_SUCCESS, // Тип действия: успешное получение ингредиентов
    payload: data // Сами ингредиенты, которые получены от сервера
});

// Функция, которая выполняет запрос на сервер для получения ингредиентов
export const getBurgerIngredients: AppThunk = () => {
    return (dispatch) =>
        apiBurger.getBurgerIngredients() // Запрос на сервер для получения ингредиентов
            .then(({ data }) => { // Обработка успешного ответа от сервера
                dispatch(getBurgerIngredientsSuccess(data)); // Диспатч действия с полученными данными
            })
            .catch((error) => { // Обработка ошибок, если запрос не удался
                console.log(error); // Вывод ошибки в консоль
            });
};
