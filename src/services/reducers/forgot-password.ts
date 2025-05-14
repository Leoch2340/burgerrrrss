import { FORGOT_PASSWORD_SUCCESS } from "../constants/constants"; // Импортируем константу для действия, которое обозначает успешное восстановление пароля.
import { TUnionAction } from "../actions/interfaces"; // Импортируем тип для действий редуктора.

type TInitialState = { // Определяем тип начального состояния редуктора.
    success: boolean // Состояние для отслеживания, был ли успешным процесс восстановления пароля.
}

export const initialState = { // Инициализируем начальное состояние редуктора.
    success: false, // Начальное состояние: восстановление пароля не прошло успешно.
}

export const forgotPasswordReducer = (state = initialState, action: TUnionAction): TInitialState => { // Определяем редуктор forgotPasswordReducer.
    switch (action.type) { // В зависимости от типа действия:
        case FORGOT_PASSWORD_SUCCESS: { // Если тип действия — FORGOT_PASSWORD_SUCCESS (восстановление пароля прошло успешно),
            return { // Возвращаем новое состояние с обновлённым значением успеха.
                ...state, // Сохраняем текущее состояние.
                success: action.payload // Устанавливаем значение успеха, которое пришло в payload.
            }
        }
        default: { // Для всех других типов действий,
            return state; // Просто возвращаем текущее состояние.
        }
    }
}
