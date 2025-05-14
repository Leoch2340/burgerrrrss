// Импортируем константы действий из файла, содержащего типы всех действий
import {
    USER_AUTHORIZATION_SUCCESS,
    SET_BUN,
    ADD_INGREDIENT,
    DELETE_INGREDIENT,
    MOVE_INGREDIENT,
    CLEAR_CONSTRUCTOR,
    SET_ACTIVE_TAB,
    SCROLL_INGREDIENTS,
    GET_BURGER_INGREDIENTS_SUCCESS,
    FORGOT_PASSWORD_SUCCESS,
    ADD_INGREDIENT_DETAILS,
    DELETE_INGREDIENT_DETAILS,
    USER_LOGOUT_SUCCESS,
    GET_ORDER_DETAILS_SUCCESS,
    USER_REGISTRATION_SUCCESS,
    RESET_PASSWORD_SUCCESS,
    GET_USER_SUCCESS,
    UPDATE_USER_SUCCESS,
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
} from "../constants/constants"

// Импортируем типы данных для ингредиентов, пользователей, заказов и заказов пользователя
import { TIngredientType, TUser, TOrders, TUserOrders } from "../types/types"

// Интерфейс для действия авторизации пользователя, тип payload - булево значение
export interface IUserAuthorizationSuccess {
    readonly type: typeof USER_AUTHORIZATION_SUCCESS,  // Тип действия
    readonly payload: boolean  // Данные, передаваемые с действием (успешная авторизация)
}

// Интерфейс для действия установки булочки в конструктор бургера
export interface ISetBun {
    readonly type: typeof SET_BUN,  // Тип действия
    readonly payload: TIngredientType  // Данные (ингредиент типа булочка)
}

// Интерфейс для добавления ингредиента в конструктор
export interface IAddIngredient {
    readonly type: typeof ADD_INGREDIENT,  // Тип действия
    readonly payload: TIngredientType  // Данные (ингредиент)
}

// Интерфейс для удаления ингредиента из конструктора
export interface IDeleteIngredient {
    readonly type: typeof DELETE_INGREDIENT,  // Тип действия
    readonly payload: TIngredientType  // Данные (удаляемый ингредиент)
}

// Интерфейс для перемещения ингредиента в конструкторе
export interface IMoveIngredient {
    readonly type: typeof MOVE_INGREDIENT,  // Тип действия
    readonly payload: {  // Данные о перемещении
        start: number,  // Начальная позиция ингредиента
        end: number  // Конечная позиция ингредиента
    }
}

// Интерфейс для очистки конструктора
export interface IClearConstructor {
    readonly type: typeof CLEAR_CONSTRUCTOR  // Тип действия
}

// Интерфейс для установки активной вкладки
export interface ISetActiveTab {
    readonly type: typeof SET_ACTIVE_TAB,  // Тип действия
    readonly payload: string  // Данные (название вкладки)
}

// Интерфейс для скролла ингредиентов
export interface IScrollIngredients {
    readonly type: typeof SCROLL_INGREDIENTS,  // Тип действия
    readonly payload: string  // Данные (имя ингредиента)
}

// Интерфейс для успешного получения списка ингредиентов
export interface IGetBurgerIngredientsSuccess {
    readonly type: typeof GET_BURGER_INGREDIENTS_SUCCESS,  // Тип действия
    readonly payload: Array<TIngredientType>  // Данные (массив ингредиентов)
}

// Интерфейс для успешного запроса на восстановление пароля
export interface IForgotPasswordSuccess {
    readonly type: typeof FORGOT_PASSWORD_SUCCESS,  // Тип действия
    readonly payload: boolean  // Данные (успех или неудача)
}

// Интерфейс для добавления ингредиента в детали (например, для отображения на подробной странице)
export interface IAddIngredientDetails {
    readonly type: typeof ADD_INGREDIENT_DETAILS,  // Тип действия
    readonly payload: TIngredientType  // Данные (ингредиент)
}

// Интерфейс для удаления ингредиента из деталей
export interface IDeleteIngredientDetails {
    readonly type: typeof DELETE_INGREDIENT_DETAILS  // Тип действия
}

// Интерфейс для успешного выхода пользователя
export interface IUserLogoutSuccess {
    readonly type: typeof USER_LOGOUT_SUCCESS,  // Тип действия
    readonly payload: boolean  // Данные (успех или неудача)
}

// Интерфейс для получения деталей заказа
export interface IGetOrderDetailsSuccess {
    readonly type: typeof GET_ORDER_DETAILS_SUCCESS,  // Тип действия
    readonly payload: string  // Данные (детали заказа)
}

// Интерфейс для успешной регистрации пользователя
export interface IUserRegistrationSuccess {
    readonly type: typeof USER_REGISTRATION_SUCCESS,  // Тип действия
    readonly payload: TUser  // Данные (пользователь)
}

// Интерфейс для успешного восстановления пароля
export interface IResetPasswordSuccess {
    readonly type: typeof RESET_PASSWORD_SUCCESS,  // Тип действия
    readonly payload: boolean  // Данные (успех или неудача)
}

// Интерфейс для получения данных пользователя
export interface IGetUserSuccess {
    readonly type: typeof GET_USER_SUCCESS,  // Тип действия
    readonly payload: TUser  // Данные (пользователь)
}

// Интерфейс для обновления данных пользователя
export interface IUpdateUserSuccess {
    readonly type: typeof UPDATE_USER_SUCCESS,  // Тип действия
    readonly payload: TUser  // Данные (обновленные данные пользователя)
}

// Интерфейс для начала соединения с WebSocket
export interface IWsConnectionStart {
    readonly type: typeof WS_CONNECTION_START  // Тип действия
}

// Интерфейс для успешного соединения с WebSocket
export interface IWsConnectionSuccess {
    readonly type: typeof WS_CONNECTION_SUCCESS  // Тип действия
}

// Интерфейс для ошибки соединения с WebSocket
export interface IWsConnectionError {
    readonly type: typeof WS_CONNECTION_ERROR  // Тип действия
}

// Интерфейс для закрытия соединения с WebSocket
export interface IWsConnectionClosed {
    readonly type: typeof WS_CONNECTION_CLOSED  // Тип действия
}

// Интерфейс для получения заказов через WebSocket
export interface IWsGetOrders {
    readonly type: typeof WS_GET_ORDERS,  // Тип действия
    readonly payload: TOrders  // Данные (заказы)
}

// Интерфейс для начала соединения с WebSocket для пользователя
export interface IWsConnectionStartUser {
    readonly type: typeof WS_CONNECTION_START_USER  // Тип действия
}

// Интерфейс для успешного соединения с WebSocket для пользователя
export interface IWsConnectionSuccessUser {
    readonly type: typeof WS_CONNECTION_SUCCESS_USER  // Тип действия
}

// Интерфейс для ошибки соединения с WebSocket для пользователя
export interface IWsConnectionErrorUser {
    readonly type: typeof WS_CONNECTION_ERROR_USER  // Тип действия
}

// Интерфейс для закрытия соединения с WebSocket для пользователя
export interface IWsConnectionClosedUser {
    readonly type: typeof WS_CONNECTION_CLOSED_USER  // Тип действия
}

// Интерфейс для получения заказов через WebSocket для пользователя
export interface IWsGetOrdersUser {
    readonly type: typeof WS_GET_ORDERS_USER,  // Тип действия
    readonly payload: TUserOrders  // Данные (заказы пользователя)
}

// Объединенный тип для всех действий, описанных выше
export type TUnionAction =
    | IUserAuthorizationSuccess
    | ISetBun
    | IAddIngredient
    | IDeleteIngredient
    | IMoveIngredient
    | IClearConstructor
    | ISetActiveTab
    | IScrollIngredients
    | IGetBurgerIngredientsSuccess
    | IForgotPasswordSuccess
    | IAddIngredientDetails
    | IDeleteIngredientDetails
    | IUserLogoutSuccess
    | IGetOrderDetailsSuccess
    | IUserRegistrationSuccess
    | IResetPasswordSuccess
    | IGetBurgerIngredientsSuccess
    | IGetUserSuccess
    | IUpdateUserSuccess
    | IWsConnectionStart
    | IWsConnectionSuccess
    | IWsConnectionError
    | IWsConnectionClosed
    | IWsGetOrders
    | IWsConnectionStartUser
    | IWsConnectionSuccessUser
    | IWsConnectionErrorUser
    | IWsConnectionClosedUser
    | IWsGetOrdersUser

// Объединенный тип для WebSocket действий (общий)
export type TUnionWsAction =
    | IWsConnectionStart
    | IWsConnectionSuccess
    | IWsConnectionError
    | IWsConnectionClosed
    | IWsGetOrders

// Объединенный тип для WebSocket действий (для пользователя)
export type TUnionWsActionUser =
    | IWsConnectionStartUser
    | IWsConnectionSuccessUser
    | IWsConnectionErrorUser
    | IWsConnectionClosedUser
    | IWsGetOrdersUser

// Интерфейс, описывающий действия для WebSocket
export interface IWsActions {
    readonly wsInit: string  // Инициализация WebSocket
    readonly onOpen: string  // Событие открытия соединения
    readonly onClose: string  // Событие закрытия соединения
    readonly onError: string  // Событие ошибки
    readonly onOrders: string  // Событие получения заказов
}
