import { apiBurger } from "../../utils/api"; // Импорт функции для обращения к API (например, для авторизации пользователя)
import { setCookie } from "../../utils/сookies"; // Импорт утилиты для работы с cookies (устанавливаем токены)
import { USER_AUTHORIZATION_SUCCESS } from "../constants/constants"; // Импорт константы для действия успешной авторизации
import { AppThunk } from "../types/types"; // Импорт типа для асинхронных действий в Redux (Thunk)
import { IUserAuthorizationSuccess } from "./interfaces"; // Импорт интерфейса для действия успешной авторизации

// Действие для успешной авторизации
export const userAuthorizationSuccess = (payload: boolean): IUserAuthorizationSuccess => ({
    type: USER_AUTHORIZATION_SUCCESS, // Тип действия (стандартная практика для Redux)
    payload // В данном случае payload - это результат авторизации (успех/неуспех)
});

// Асинхронное действие для авторизации пользователя (с помощью Thunk)
export const userAuthorization: AppThunk = (email: string, password: string) => {
    return (dispatch) =>
        apiBurger.authorization(email, password) // Вызов API для авторизации пользователя
            .then((data) => { // Обработка ответа от API
                const { success, refreshToken, accessToken } = data; // Деструктуризация данных из ответа API
                if (success) { // Если авторизация успешна
                    setCookie('access', accessToken.split('Bearer ')[1]); // Устанавливаем accessToken в cookies
                    setCookie('refresh', refreshToken); // Устанавливаем refreshToken в cookies
                    dispatch(userAuthorizationSuccess(data)); // Диспатчим успешную авторизацию в Redux
                }
            })
            .catch((error) => { // Обработка ошибок в случае неудачного запроса
                console.log(error); // Логируем ошибку в консоль
            });
};
