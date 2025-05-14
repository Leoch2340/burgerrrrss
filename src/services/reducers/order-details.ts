import { GET_ORDER_DETAILS_SUCCESS } from "../constants/constants" // Импортируем константу для действия получения деталей заказа.
import { TUnionAction } from "../actions/interfaces" // Импортируем тип для объединённого действия из интерфейсов.

type TInitialState = { // Тип для начального состояния редуктора.
  number: string // Свойство для хранения номера заказа.
}

export const initialState = { // Начальное состояние редуктора.
  number: '' // Изначально номер заказа пустой строкой.
}

export const orderDetailsReducer = (state = initialState, action: TUnionAction): TInitialState => { // Редуктор для управления состоянием деталей заказа.
  switch (action.type) { // Проверяем тип действия.
    case GET_ORDER_DETAILS_SUCCESS: { // Если действие - успешное получение деталей заказа.
      return {
        ...state, // Возвращаем текущее состояние с обновлённым номером заказа.
        number: action.payload // Обновляем номер заказа из данных в payload.
      }
    }
    default: { // Если действие не распознано.
      return state; // Возвращаем текущее состояние без изменений.
    }
  }
}
