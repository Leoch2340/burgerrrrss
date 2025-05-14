import { RESET_PASSWORD_SUCCESS } from "../constants/constants" // Импортируем константу для успешного сброса пароля.
import { TUnionAction } from "../actions/interfaces" // Импортируем тип для объединённого действия из интерфейсов.

type TInitialState = { // Тип для начального состояния редуктора, который содержит флаг успешности сброса пароля.
    success: boolean
}

export const initialState = { // Начальное состояние редуктора.
    success: false, // По умолчанию сброс пароля не был успешен.
}

export const resetPasswordReducer = (state = initialState, action: TUnionAction): TInitialState => { // Редуктор для управления состоянием сброса пароля.
    switch (action.type) { // Проверяем тип действия.
        case RESET_PASSWORD_SUCCESS: { // Если действие - успешный сброс пароля.
            return {
                ...state, // Возвращаем текущее состояние с обновлённым флагом успешности.
                success: action.payload // Обновляем флаг успешности сброса пароля из данных действия.
            }
        }
        default: { // Если действие не распознано.
            return state; // Возвращаем текущее состояние без изменений.
        }
    }
}
