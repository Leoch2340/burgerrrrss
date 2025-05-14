import { GET_USER_SUCCESS, UPDATE_USER_SUCCESS } from "../constants/constants" // Импортируем константы для получения и обновления пользователя.
import { TUnionAction } from "../actions/interfaces"; // Импортируем тип для объединённого действия.
import { TUser } from "../types/types"; // Импортируем тип пользователя для использования в состоянии.

type TInitialState = TUser // Тип для начального состояния редуктора, который будет совпадать с типом пользователя.

export const initialState: TInitialState = { // Начальное состояние редуктора профиля.
  success: false, // Флаг успешности получения или обновления пользователя.
  user: { // Объект пользователя с его данными.
    email: '', // Пустой email по умолчанию.
    name: '' // Пустое имя по умолчанию.
  },
};

export const profileReducer = (state = initialState, action: TUnionAction): TInitialState => { // Редуктор для управления состоянием профиля.
  switch (action.type) { // Проверяем тип действия.
    case GET_USER_SUCCESS: { // Если действие - успешное получение данных пользователя.
      return {
        ...state, // Возвращаем текущее состояние с обновлёнными данными.
        success: action.payload.success, // Обновляем флаг успешности.
        user: action.payload.user, // Обновляем данные пользователя из payload.
      }
    }
    case UPDATE_USER_SUCCESS: { // Если действие - успешное обновление данных пользователя.
      return {
        ...state, // Возвращаем текущее состояние с обновлёнными данными.
        success: action.payload.success, // Обновляем флаг успешности.
        user: action.payload.user, // Обновляем данные пользователя из payload.
      }
    }
    default: { // Если тип действия не совпадает с вышеуказанным.
      return state; // Возвращаем текущее состояние без изменений.
    }
  }
}
