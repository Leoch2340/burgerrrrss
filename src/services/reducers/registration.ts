import { USER_REGISTRATION_SUCCESS } from "../constants/constants" // Импортируем константу для успешной регистрации пользователя.
import { TUnionAction } from "../actions/interfaces" // Импортируем тип для объединённого действия из интерфейсов.
import { TUser } from "../types/types" // Импортируем тип пользователя.

type TInitialState = TUser // Тип для начального состояния редуктора, соответствующий типу пользователя.

export const initialState: TInitialState = { // Начальное состояние редуктора.
  success: false, // По умолчанию регистрация не удалась.
  user: { // Начальные данные о пользователе, пустые значения.
    email: '', // Пустой email.
    name: '' // Пустое имя.
  },
}

export const userRegistrationReducer = (state = initialState, action: TUnionAction): TInitialState => { // Редуктор для управления состоянием регистрации пользователя.
  switch (action.type) { // Проверяем тип действия.
    case USER_REGISTRATION_SUCCESS: { // Если действие - успешная регистрация пользователя.
      return {
        ...state, // Возвращаем текущее состояние с обновлёнными данными.
        success: action.payload.success, // Обновляем флаг успешности регистрации.
        user: action.payload.user // Обновляем данные пользователя.
      }
    }
    default: { // Если действие не распознано.
      return state; // Возвращаем текущее состояние без изменений.
    }
  }
}
