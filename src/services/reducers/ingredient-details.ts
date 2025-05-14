import {
  ADD_INGREDIENT_DETAILS, // Импортируем константу для действия добавления деталей ингредиента.
  DELETE_INGREDIENT_DETAILS // Импортируем константу для действия удаления деталей ингредиента.
} from "../constants/constants" // Импортируем константы из файла с определениями действий.
import { TUnionAction } from "../actions/interfaces" // Импортируем тип для объединённого действия из интерфейсов.

type TInitialState = { // Тип для начального состояния редуктора.
  ingredientDetails: { // Объект, содержащий детали ингредиента.
    image_large?: string, // URL изображения ингредиента (необязательное поле).
    name?: string, // Название ингредиента (необязательное поле).
    calories?: number, // Количество калорий (необязательное поле).
    proteins?: number, // Количество белков (необязательное поле).
    fat?: number, // Количество жиров (необязательное поле).
    carbohydrates?: number // Количество углеводов (необязательное поле).
  }
} 

export const initialState: TInitialState = { // Начальное состояние редуктора.
  ingredientDetails: {} // Изначально детали ингредиента пустые.
}

export const ingredientDetailsReducer = (state = initialState, action: TUnionAction): TInitialState => { // Редуктор для управления состоянием деталей ингредиента.
  switch (action.type) { // Проверяем тип действия.
    case ADD_INGREDIENT_DETAILS: { // Если действие - добавление деталей ингредиента.
      return {
        ...state, // Возвращаем текущее состояние с обновлёнными деталями ингредиента.
        ingredientDetails: action.payload // Обновляем объект ingredientDetails из данных в payload.
      }
    }
    case DELETE_INGREDIENT_DETAILS: { // Если действие - удаление деталей ингредиента.
      return {
        ...state, // Возвращаем текущее состояние.
        ingredientDetails: {} // Очищаем объект ingredientDetails.
      }
    }
    default: { // Если действие не распознано.
      return state; // Возвращаем текущее состояние без изменений.
    }
  }
}
