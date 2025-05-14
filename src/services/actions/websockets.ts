// Импортируем константы и типы
import { 
    WS_CONNECTION_START, 
    WS_CONNECTION_SUCCESS, 
    WS_CONNECTION_ERROR, 
    WS_CONNECTION_CLOSED, 
    WS_GET_ORDERS, 
    WS_CONNECTION_START_USER, 
    WS_CONNECTION_SUCCESS_USER, 
    WS_CONNECTION_ERROR_USER, 
    WS_CONNECTION_CLOSED_USER, 
    WS_GET_ORDERS_USER 
} from "../constants/constants";  // Константы для действий WebSocket-соединения и получения заказов
import { TOrders, TUserOrders } from "../types/types";  // Типы для заказов и пользовательских заказов
import { 
    IWsConnectionStart, 
    IWsConnectionSuccess, 
    IWsConnectionError, 
    IWsConnectionClosed, 
    IWsGetOrders, 
    IWsConnectionStartUser, 
    IWsConnectionSuccessUser, 
    IWsConnectionErrorUser, 
    IWsConnectionClosedUser, 
    IWsGetOrdersUser, 
    IWsActions 
} from "./interfaces";  // Интерфейсы для действий WebSocket-соединения и получения заказов

// Функция для начала WebSocket-соединения
export const wsConnectionStart = (): IWsConnectionStart => {
    return {
        type: WS_CONNECTION_START  // Экшн для начала соединения
    };
};

// Функция для успешного установления WebSocket-соединения
export const wsConnectionSuccess = (): IWsConnectionSuccess => {
    return {
        type: WS_CONNECTION_SUCCESS  // Экшн для успешного соединения
    };
};

// Функция для обработки ошибки соединения WebSocket
export const wsConnectionError = (): IWsConnectionError => {
    return {
        type: WS_CONNECTION_ERROR  // Экшн для ошибки соединения
    };
};

// Функция для обработки закрытия WebSocket-соединения
export const wsConnectionClosed = (): IWsConnectionClosed => {
    return {
        type: WS_CONNECTION_CLOSED  // Экшн для закрытия соединения
    };
};

// Функция для получения заказов через WebSocket
export const wsGetOrderds = (payload: TOrders): IWsGetOrders => {
    return {
        type: WS_GET_ORDERS,  // Экшн для получения заказов
        payload  // Передаем список заказов
    };
};

// Функция для начала WebSocket-соединения для пользователя
export const wsConnectionStartUser = (): IWsConnectionStartUser => {
    return {
        type: WS_CONNECTION_START_USER  // Экшн для начала соединения пользователя
    };
};

// Функция для успешного установления WebSocket-соединения для пользователя
export const wsConnectionSuccessUser = (): IWsConnectionSuccessUser => {
    return {
        type: WS_CONNECTION_SUCCESS_USER  // Экшн для успешного соединения пользователя
    };
};

// Функция для обработки ошибки соединения WebSocket для пользователя
export const wsConnectionErrorUser = (): IWsConnectionErrorUser => {
    return {
        type: WS_CONNECTION_ERROR_USER  // Экшн для ошибки соединения пользователя
    };
};

// Функция для обработки закрытия WebSocket-соединения для пользователя
export const wsConnectionClosedUser = (): IWsConnectionClosedUser => {
    return {
        type: WS_CONNECTION_CLOSED_USER  // Экшн для закрытия соединения пользователя
    };
};

// Функция для получения заказов через WebSocket для пользователя
export const wsGetOrderdsUser = (payload: TUserOrders): IWsGetOrdersUser => {
    return {
        type: WS_GET_ORDERS_USER,  // Экшн для получения заказов пользователя
        payload  // Передаем список заказов пользователя
    };
};

// Объект с действиями для WebSocket-соединения
export const wsActions: IWsActions = {
    wsInit: WS_CONNECTION_START,  // Начало соединения
    onOpen: WS_CONNECTION_SUCCESS,  // Успешное соединение
    onClose: WS_CONNECTION_CLOSED,  // Закрытие соединения
    onError: WS_CONNECTION_ERROR,  // Ошибка соединения
    onOrders: WS_GET_ORDERS  // Получение заказов
};

// Объект с действиями для WebSocket-соединения пользователя
export const wsActionsUser: IWsActions = {
    wsInit: WS_CONNECTION_START_USER,  // Начало соединения пользователя
    onOpen: WS_CONNECTION_SUCCESS_USER,  // Успешное соединение пользователя
    onClose: WS_CONNECTION_CLOSED_USER,  // Закрытие соединения пользователя
    onError: WS_CONNECTION_ERROR_USER,  // Ошибка соединения пользователя
    onOrders: WS_GET_ORDERS_USER  // Получение заказов пользователя
};
