import { GET_BURGER_INGREDIENTS_SUCCESS } from "../constants/constants"; // Импортируем константу для действия, когда успешно получены ингредиенты бургера.
import { TUnionAction } from "../actions/interfaces"; // Импортируем тип для действий редуктора.
import { TIngredientType } from "../types/types"; // Импортируем тип для ингредиента.

type TInitialState = { // Определяем тип начального состояния редуктора.
  burgerIngredients: Array<TIngredientType> // Состояние для хранения списка ингредиентов бургера.
}

export const initialState: TInitialState = { // Инициализируем начальное состояние редуктора.
  burgerIngredients: [] // Начальное состояние списка ингредиентов — пустой массив.
}

export const burgerIngredientsReducer = (state = initialState, action: TUnionAction): TInitialState => { // Определяем редуктор burgerIngredientsReducer.
  switch (action.type) { // В зависимости от типа действия:
    case GET_BURGER_INGREDIENTS_SUCCESS: { // Если тип действия — GET_BURGER_INGREDIENTS_SUCCESS (получены ингредиенты),
      return { // Возвращаем новое состояние с обновлённым списком ингредиентов.
        ...state, // Сохраняем текущее состояние.
        burgerIngredients: [...action.payload], // Устанавливаем полученные ингредиенты в состояние.
      }
    }
    default: { // Для всех других типов действий,
      return state; // Просто возвращаем текущее состояние.
    }
  }
}
