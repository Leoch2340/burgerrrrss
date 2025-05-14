import { apiBurger } from "../../utils/api"; // Импорт функции apiBurger для отправки запросов на сервер
import { FORGOT_PASSWORD_SUCCESS } from "../constants/constants"; // Импорт константы для типа действия (успешное восстановление пароля)
import { AppThunk } from "../types/types"; // Импорт типа для асинхронных действий (Thunk)
import { IForgotPasswordSuccess } from "./interfaces"; // Импорт интерфейса для действия, связанного с успешным восстановлением пароля

// Создание действия для успешного восстановления пароля
export const forgotPasswordSuccess = (payload: boolean): IForgotPasswordSuccess => ({
    type: FORGOT_PASSWORD_SUCCESS, // Тип действия: успешное восстановление пароля
    payload // Данные, которые передаются в action (успешно ли восстановлен пароль)
});

// Функция для отправки запроса на восстановление пароля по email
export const forgotPassword: AppThunk = (email: string) => {
    return (dispatch) =>
        apiBurger.forgot(email) // Запрос на сервер для восстановления пароля
            .then(({ success }) => { // Обработка успешного ответа от сервера (получаем флаг успеха)
                dispatch(forgotPasswordSuccess(success)); // Диспатч действия с результатом (успешность восстановления пароля)
            })
            .catch((error) => { // Обработка ошибок, если запрос не удался
                console.log(error); // Вывод ошибки в консоль
            });
};
