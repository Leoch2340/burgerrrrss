// Импортируем необходимые утилиты и константы
import { apiBurger } from "../../utils/api";  // Функция для взаимодействия с API
import { clearConstructor } from "./burger-constructor";  // Экшн для очистки конструктора бургеров
import { GET_ORDER_DETAILS_SUCCESS } from "../constants/constants";  // Константа для экшна получения деталей заказа
import { IGetOrderDetailsSuccess } from "./interfaces";  // Интерфейс для экшна успешного получения деталей заказа
import { AppThunk } from "../types/types";  // Тип для асинхронных действий (thunk)

// Создаем экшн для успешного получения номера заказа
export const getOrderSuccess = (number: string): IGetOrderDetailsSuccess => ({ 
    type: GET_ORDER_DETAILS_SUCCESS,  // Тип действия
    payload: number  // Номер заказа
})

// Асинхронная функция для получения деталей заказа
export const getOrderDetails: AppThunk = (idIngredientsList: string[]) => {
    return (dispatch) =>
        apiBurger.getOrderDetails(idIngredientsList)  // Вызов API для получения данных заказа по списку ингредиентов
            .then(({ order: { number } }) => {  // Обработка успешного ответа с номером заказа
                dispatch(getOrderSuccess(number));  // Отправка экшна с номером заказа
            })
            .then(() => dispatch(clearConstructor()))  // Очистка конструктора бургеров после получения заказа
            .catch((error) => {  // Обработка ошибок
                console.log(error);  // Логирование ошибки
            })
}
