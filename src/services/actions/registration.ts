// Импортируем необходимые утилиты, константы и типы
import { apiBurger } from "../../utils/api";  // Функция для взаимодействия с API
import { USER_REGISTRATION_SUCCESS } from "../constants/constants";  // Константа для экшна успешной регистрации пользователя
import { AppThunk, TUser } from "../types/types";  // Типы для асинхронных действий (thunk) и данных пользователя
import { IUserRegistrationSuccess } from "./interfaces";  // Интерфейс для экшна успешной регистрации пользователя

// Создаем экшн для успешной регистрации пользователя
export const userRegistrationSuccess = (payload: TUser): IUserRegistrationSuccess => ({ 
    type: USER_REGISTRATION_SUCCESS,  // Тип действия
    payload  // Данные пользователя
})

// Асинхронная функция для регистрации пользователя
export const userRegistration: AppThunk = (name: string, email: string, password: string) => {
    return (dispatch) =>
        apiBurger.registration(name, email, password)  // Вызов API для регистрации пользователя
            .then((res) => {  // Обработка успешного ответа от сервера
                dispatch(userRegistrationSuccess(res));  // Отправка экшна с данными пользователя
            })
            .catch((error) => {  // Обработка ошибок
                console.log(error);  // Логирование ошибки
            })
}
