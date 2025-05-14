// Импортируем необходимые утилиты и константы
import { apiBurger } from "../../utils/api";  // Функция для взаимодействия с API
import { deleteCookie } from "../../utils/сookies";  // Функция для удаления cookies
import { USER_LOGOUT_SUCCESS } from "../constants/constants";  // Константа для действия выхода пользователя
import { AppThunk } from "../types/types";  // Тип для асинхронных действий (thunk)
import { IUserLogoutSuccess } from "./interfaces";  // Интерфейс для действия успешного выхода пользователя

// Экшн создает действие для успешного выхода пользователя
export const userLogoutSuccess = (payload: boolean): IUserLogoutSuccess => ({ 
    type: USER_LOGOUT_SUCCESS,  // Тип действия
    payload  // Данные о успешности выхода (true/false)
})

// Асинхронная функция для выхода пользователя
export const userLogout: AppThunk = () => {
    return (dispatch) =>
        apiBurger.logout()  // Вызов API для выхода пользователя
            .then(({ success }) => {  // Обработка успешного ответа от API
                if (success) {  // Если выход успешен
                    deleteCookie('access');  // Удаляем cookie с токеном доступа
                    deleteCookie('refresh');  // Удаляем cookie с токеном обновления
                    dispatch(userLogoutSuccess(success));  // Отправляем экшн о успешном выходе
                }
            })
            .catch((error) => {  // Обработка ошибок
                console.log(error)  // Логируем ошибку
            })
}
