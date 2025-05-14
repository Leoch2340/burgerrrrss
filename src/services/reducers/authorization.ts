import { getCookie } from "../../utils/сookies" // Импортируем функцию getCookie для получения значения cookie.
import { USER_AUTHORIZATION_SUCCESS, USER_LOGOUT_SUCCESS } from "../constants/constants" // Импортируем константы действий, связанных с авторизацией и выходом.
import { TUnionAction } from "../actions/interfaces" // Импортируем тип TUnionAction для определения типа всех возможных действий.

type TInitialState = { // Определяем тип начального состояния редуктора.
    authorization: boolean // Свойство authorization указывает, авторизован ли пользователь.
}

export const initialState = { // Инициализируем начальное состояние редуктора.
    authorization: getCookie('access') ? true : false, // Если cookie 'access' существует, установим authorization в true, иначе false.
}

export const userAuthorizationReducer = (state = initialState, action: TUnionAction): TInitialState => { // Определяем редуктор userAuthorizationReducer, который обрабатывает состояние авторизации.
    switch (action.type) { // В зависимости от типа действия:
        case USER_AUTHORIZATION_SUCCESS: { // Если тип действия — USER_AUTHORIZATION_SUCCESS (успешная авторизация),
            return { // Возвращаем новое состояние с обновлённым значением authorization.
                ...state, // Сохраняем старое состояние.
                authorization: true, // Устанавливаем authorization в true.
            }
        }
        case USER_LOGOUT_SUCCESS: { // Если тип действия — USER_LOGOUT_SUCCESS (успешный выход),
            return { // Возвращаем новое состояние с обновлённым значением authorization.
                ...state, // Сохраняем старое состояние.
                authorization: false, // Устанавливаем authorization в false.
            }
        }
        default: { // Для всех остальных действий возвращаем текущее состояние.
            return state;
        }
    }
}
