// Объявляем строковые константы для различных действий, которые будут использоваться в Redux для управления состоянием

// Константы для действий, связанных с авторизацией и выходом пользователя
export const USER_AUTHORIZATION_SUCCESS: 'USER_AUTHORIZATION_SUCCESS' = 'USER_AUTHORIZATION_SUCCESS';  // Успешная авторизация пользователя
export const USER_LOGOUT_SUCCESS: 'USER_LOGOUT_SUCCESS' = 'USER_LOGOUT_SUCCESS';  // Успешный выход пользователя

// Константы для действий с ингредиентами бургера
export const SET_BUN: 'SET_BUN' = 'SET_BUN';  // Установить булочку в конструкторе бургера
export const ADD_INGREDIENT: 'ADD_INGREDIENT' = 'ADD_INGREDIENT';  // Добавить ингредиент в конструктор
export const DELETE_INGREDIENT: 'DELETE_INGREDIENT' = 'DELETE_INGREDIENT';  // Удалить ингредиент из конструктора
export const MOVE_INGREDIENT: 'MOVE_INGREDIENT' = 'MOVE_INGREDIENT';  // Переместить ингредиент в конструкторе
export const CLEAR_CONSTRUCTOR: 'CLEAR_CONSTRUCTOR' = 'CLEAR_CONSTRUCTOR';  // Очистить конструктор бургера

// Константы для управления вкладками и прокруткой ингредиентов
export const SET_ACTIVE_TAB: 'SET_ACTIVE_TAB' = 'SET_ACTIVE_TAB';  // Установить активную вкладку
export const SCROLL_INGREDIENTS: 'SCROLL_INGREDIENTS' = 'SCROLL_INGREDIENTS';  // Прокрутить ингредиенты

// Константы для получения успешного ответа при получении ингредиентов бургера
export const GET_BURGER_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';  // Успешное получение ингредиентов

// Константы для восстановления пароля
export const FORGOT_PASSWORD_SUCCESS: 'FORGOT_PASSWORD_SUCCESS' = 'FORGOT_PASSWORD_SUCCESS';  // Успешное восстановление пароля

// Константы для работы с деталями ингредиентов
export const ADD_INGREDIENT_DETAILS: 'ADD_INGREDIENT_DETAILS' = 'ADD_INGREDIENT_DETAILS';  // Добавить детали ингредиента
export const DELETE_INGREDIENT_DETAILS: 'DELETE_INGREDIENT_DETAILS' = 'DELETE_INGREDIENT_DETAILS';  // Удалить детали ингредиента

// Константа для получения успешной информации о заказе
export const GET_ORDER_DETAILS_SUCCESS: 'GET_ORDER_SUCCESS' = 'GET_ORDER_SUCCESS';  // Успешное получение деталей заказа

// Константа для успешной регистрации пользователя
export const USER_REGISTRATION_SUCCESS: 'USER_REGISTRATION_SUCCESS' = 'USER_REGISTRATION_SUCCESS';  // Успешная регистрация пользователя

// Константа для успешного сброса пароля
export const RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS' = 'RESET_PASSWORD_SUCCESS';  // Успешный сброс пароля

// Константы для получения и обновления информации о пользователе
export const GET_USER_SUCCESS: 'GET_USER_SUCCESS' = 'GET_USER_SUCCESS';  // Успешное получение данных о пользователе
export const UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS' = 'UPDATE_USER_SUCCESS';  // Успешное обновление данных пользователя

// Константы для WebSocket-соединения и получения заказов
export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';  // Начало WebSocket-соединения
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';  // Успешное WebSocket-соединение
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';  // Ошибка WebSocket-соединения
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';  // Закрытие WebSocket-соединения
export const WS_GET_ORDERS: 'WS_GET_ORDERS' = 'WS_GET_ORDERS';  // Получение заказов через WebSocket

// Константы для WebSocket-соединения и получения заказов для пользователя
export const WS_CONNECTION_START_USER: 'WS_CONNECTION_START_USER' = 'WS_CONNECTION_START_USER';  // Начало WebSocket-соединения пользователя
export const WS_CONNECTION_SUCCESS_USER: 'WS_CONNECTION_SUCCESS_USER' = 'WS_CONNECTION_SUCCESS_USER';  // Успешное WebSocket-соединение пользователя
export const WS_CONNECTION_ERROR_USER: 'WS_CONNECTION_ERROR_USER' = 'WS_CONNECTION_ERROR_USER';  // Ошибка WebSocket-соединения пользователя
export const WS_CONNECTION_CLOSED_USER: 'WS_CONNECTION_CLOSED_USER' = 'WS_CONNECTION_CLOSED_USER';  // Закрытие WebSocket-соединения пользователя
export const WS_GET_ORDERS_USER: 'WS_GET_ORDERS_USER' = 'WS_GET_ORDERS_USER';  // Получение заказов пользователя через WebSocket
