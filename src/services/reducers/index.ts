import { combineReducers } from 'redux'; // Импортируем функцию combineReducers из библиотеки redux для объединения нескольких редукторов.
import { burgerIngredientsReducer } from './burger-ingredients'; // Импортируем редуктор для управления состоянием ингредиентов бургеров.
import { ingredientDetailsReducer } from './ingredient-details'; // Импортируем редуктор для управления состоянием деталей ингредиента.
import { burgerConstructorReducer } from './burger-constructor'; // Импортируем редуктор для управления состоянием конструктора бургера.
import { orderDetailsReducer } from './order-details'; // Импортируем редуктор для управления состоянием деталей заказа.
import { scrollIngredientsReducer } from './burger-ingredients-scroll'; // Импортируем редуктор для управления состоянием прокрутки ингредиентов.
import { userRegistrationReducer } from './registration'; // Импортируем редуктор для управления состоянием регистрации пользователя.
import { forgotPasswordReducer } from './forgot-password'; // Импортируем редуктор для управления состоянием забытого пароля.
import { resetPasswordReducer } from './reset-password'; // Импортируем редуктор для управления состоянием сброса пароля.
import { userAuthorizationReducer } from './authorization'; // Импортируем редуктор для управления состоянием авторизации пользователя.
import { profileReducer } from './user'; // Импортируем редуктор для управления состоянием профиля пользователя.
import { wsReducer, wsUserReducer } from './websockets'; // Импортируем редукторы для управления состоянием вебсокетов.

export const rootReducer = combineReducers({ // Используем combineReducers для объединения всех редукторов в один основной редуктор.
    burgerIngredients: burgerIngredientsReducer, // Управление состоянием ингредиентов бургера.
    ingredientDetails: ingredientDetailsReducer, // Управление состоянием деталей ингредиента.
    burgerConstructor: burgerConstructorReducer, // Управление состоянием конструктора бургера.
    orderDetails: orderDetailsReducer, // Управление состоянием деталей заказа.
    scrollIngredients: scrollIngredientsReducer, // Управление состоянием прокрутки ингредиентов.
    registration: userRegistrationReducer, // Управление состоянием регистрации пользователя.
    forgotPassword: forgotPasswordReducer, // Управление состоянием забытого пароля.
    resetPassword: resetPasswordReducer, // Управление состоянием сброса пароля.
    userAuthorization: userAuthorizationReducer, // Управление состоянием авторизации пользователя.
    profile: profileReducer, // Управление состоянием профиля пользователя.
    webSocket: wsReducer, // Управление состоянием вебсокетов (общие сокеты).
    webSocketUser: wsUserReducer // Управление состоянием вебсокетов (сокеты пользователя).
})
