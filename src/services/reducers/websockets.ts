import {
    WS_CONNECTION_SUCCESS, // Константа для успешного подключения WebSocket.
    WS_CONNECTION_ERROR, // Константа для ошибки при подключении WebSocket.
    WS_CONNECTION_CLOSED, // Константа для закрытого соединения WebSocket.
    WS_GET_ORDERS, // Константа для получения заказов через WebSocket.
    WS_CONNECTION_SUCCESS_USER, // Константа для успешного подключения WebSocket для пользователя.
    WS_CONNECTION_ERROR_USER, // Константа для ошибки подключения WebSocket для пользователя.
    WS_CONNECTION_CLOSED_USER, // Константа для закрытого соединения WebSocket для пользователя.
    WS_GET_ORDERS_USER // Константа для получения заказов через WebSocket для пользователя.
} from "../constants/constants"; // Импортируем все необходимые константы.

import { TUnionWsAction, TUnionWsActionUser } from "../actions/interfaces"; // Импортируем типы для действий WebSocket.
import { TOrder } from "../types/types"; // Импортируем тип для заказа.

type TInitialState = { // Тип для состояния редуктора WebSocket.
    wsConnection: boolean, // Статус соединения WebSocket (подключено/не подключено).
    orders: Array<TOrder> | [], // Список заказов.
    total: null | number, // Общая сумма заказов.
    totalToday: null | number // Сумма заказов за сегодня.
}

export const initialState: TInitialState = { // Начальное состояние редуктора WebSocket.
    wsConnection: false, // По умолчанию нет соединения.
    orders: [], // Начальный список заказов пуст.
    total: null, // Начальная сумма равна null.
    totalToday: null // Начальная сумма заказов на сегодня равна null.
}

type TInitialStateUser = { // Тип для состояния редуктора WebSocket для пользователя.
    wsConnection: boolean, // Статус соединения WebSocket для пользователя.
    orders: Array<TOrder> | [] // Список заказов пользователя.
}

export const initialStateUser: TInitialStateUser = { // Начальное состояние редуктора WebSocket для пользователя.
    wsConnection: false, // По умолчанию нет соединения.
    orders: [] // Начальный список заказов пользователя пуст.
}

export const wsReducer = (state = initialState, action: TUnionWsAction): TInitialState => { // Редуктор для управления состоянием WebSocket.
    switch (action.type) { // Проверяем тип действия.
        case WS_CONNECTION_SUCCESS: { // Если соединение успешно установлено.
            return {
                ...state,
                wsConnection: true // Обновляем статус соединения на true.
            };
        }
        case WS_CONNECTION_ERROR: { // Если ошибка при подключении.
            return {
                ...state,
                wsConnection: false // Обновляем статус соединения на false.
            };
        }
        case WS_CONNECTION_CLOSED: { // Если соединение закрыто.
            return {
                ...state,
                wsConnection: false, // Обновляем статус соединения на false.
                orders: [], // Очищаем список заказов.
                total: null, // Обнуляем общую сумму.
                totalToday: null // Обнуляем сумму заказов на сегодня.
            };
        }
        case WS_GET_ORDERS: { // Если пришли новые заказы через WebSocket.
            return {
                ...state,
                orders: action.payload.orders, // Обновляем список заказов.
                total: action.payload.total, // Обновляем общую сумму заказов.
                totalToday: action.payload.totalToday // Обновляем сумму заказов на сегодня.
            };
        }
        default:
            return state // Возвращаем текущее состояние, если не подошло ни одно из действий.
    }
}

export const wsUserReducer = (state = initialStateUser, action: TUnionWsActionUser): TInitialStateUser => { // Редуктор для управления состоянием WebSocket для пользователя.
    switch (action.type) { // Проверяем тип действия.
        case WS_CONNECTION_SUCCESS_USER: { // Если соединение успешно установлено для пользователя.
            return {
                ...state,
                wsConnection: true // Обновляем статус соединения на true.
            };
        }
        case WS_CONNECTION_ERROR_USER: { // Если ошибка при подключении для пользователя.
            return {
                ...state,
                wsConnection: false // Обновляем статус соединения на false.
            };
        }
        case WS_CONNECTION_CLOSED_USER: { // Если соединение закрыто для пользователя.
            return {
                ...state,
                wsConnection: false, // Обновляем статус соединения на false.
                orders: [] // Очищаем список заказов пользователя.
            };
        }
        case WS_GET_ORDERS_USER: { // Если пришли новые заказы через WebSocket для пользователя.
            return {
                ...state,
                orders: action.payload.orders // Обновляем список заказов пользователя.
            };
        }
        default:
            return state // Возвращаем текущее состояние, если не подошло ни одно из действий.
    }
}
