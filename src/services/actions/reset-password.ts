// Импортируем необходимые утилиты, константы и типы
import { apiBurger } from "../../utils/api";  // Функция для взаимодействия с API
import { RESET_PASSWORD_SUCCESS } from "../constants/constants";  // Константа для экшна успешного сброса пароля
import { AppThunk } from "../types/types";  // Тип для асинхронных действий (thunk)
import { IResetPasswordSuccess } from "./interfaces";  // Интерфейс для экшна успешного сброса пароля

// Создаем экшн для успешного сброса пароля
export const resetPasswordSuccess = (payload: boolean): IResetPasswordSuccess => ({ 
    type: RESET_PASSWORD_SUCCESS,  // Тип действия
    payload  // Статус успешности сброса пароля
})

// Асинхронная функция для сброса пароля
export const resetPassword: AppThunk = (password: string, token: string) => {
    return (dispatch) =>
        apiBurger.reset(password, token)  // Вызов API для сброса пароля
            .then(({ success }) => {  // Обработка успешного ответа от сервера
                dispatch(resetPasswordSuccess(success));  // Отправка экшна с результатом сброса
            })
            .catch((error) => {  // Обработка ошибок
                console.log(error);  // Логирование ошибки
            })
}
