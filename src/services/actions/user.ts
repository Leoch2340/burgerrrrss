// Импортируем необходимые утилиты, константы и типы
import { apiBurger } from "../../utils/api";  // Функция для взаимодействия с API
import { GET_USER_SUCCESS, UPDATE_USER_SUCCESS } from "../constants/constants";  // Константы для экшенов успешного получения и обновления пользователя
import { AppThunk, TUser } from "../types/types";  // Тип для асинхронных действий (thunk) и тип пользователя
import { IGetUserSuccess, IUpdateUserSuccess } from "./interfaces";  // Интерфейсы для экшенов успешного получения и обновления пользователя

// Создаем экшн для успешного получения данных пользователя
export const getUserSuccess = (payload: TUser): IGetUserSuccess => ({ 
    type: GET_USER_SUCCESS,  // Тип действия
    payload  // Данные пользователя
})

// Асинхронная функция для получения данных пользователя
export const getUser: AppThunk = () => {
    return (dispatch) =>
        apiBurger.getProfile()  // Вызов API для получения профиля пользователя
            .then((data) => {  // Обработка успешного ответа от сервера
                dispatch(getUserSuccess(data));  // Отправка экшна с данными пользователя
            })
            .catch((error) => {  // Обработка ошибок
                console.log(error);  // Логирование ошибки
            })
}

// Создаем экшн для успешного обновления данных пользователя
export const updateUserSuccess = (payload: TUser): IUpdateUserSuccess => ({ 
    type: UPDATE_USER_SUCCESS,  // Тип действия
    payload  // Обновленные данные пользователя
})

// Асинхронная функция для обновления данных пользователя
export const updateUser: AppThunk = (name: string, email: string, password: string) => {
    return (dispatch) =>
        apiBurger.updateProfile(name, email, password)  // Вызов API для обновления профиля пользователя
            .then((data) => {  // Обработка успешного ответа от сервера
                dispatch(updateUserSuccess(data));  // Отправка экшна с обновленными данными пользователя
            })
            .catch((error) => {  // Обработка ошибок
                console.log(error);  // Логирование ошибки
            })
}
