import {
    SET_ACTIVE_TAB, // Импортируем константу для действия установки активной вкладки.
    SCROLL_INGREDIENTS // Импортируем константу для действия прокрутки ингредиентов.
} from "../constants/constants"; // Импортируем все константы действий из файла constants.
import { TUnionAction } from "../actions/interfaces"; // Импортируем тип для действий редуктора.

type TInitialState = { // Определяем тип начального состояния редуктора.
    current: string, // Текущая активная вкладка (например, "bun", "sauce", "main").
    scroll: string // Состояние прокрутки ингредиентов.
}

const initialState = { // Инициализируем начальное состояние редуктора.
    current: 'bun', // Устанавливаем "bun" как активную вкладку по умолчанию.
    scroll: 'bun' // Устанавливаем "bun" как текущую прокрутку ингредиентов по умолчанию.
}

export const scrollIngredientsReducer = (state = initialState, action: TUnionAction): TInitialState => { // Определяем редуктор scrollIngredientsReducer.
    switch (action.type) { // В зависимости от типа действия:
        case SET_ACTIVE_TAB: { // Если тип действия — SET_ACTIVE_TAB (установка активной вкладки),
            return { // Возвращаем новое состояние с обновлённой активной вкладкой.
                ...state, // Сохраняем текущее состояние.
                current: action.payload // Устанавливаем новое значение для activeTab.
            }
        }
        case SCROLL_INGREDIENTS: { // Если тип действия — SCROLL_INGREDIENTS (обновление состояния прокрутки ингредиентов),
            return { // Возвращаем новое состояние с обновлённой прокруткой.
                ...state, // Сохраняем текущее состояние.
                scroll: action.payload // Устанавливаем новое значение для прокрутки.
            }
        }
        default: { // Для всех других типов действий,
            return state; // Просто возвращаем текущее состояние.
        }
    }
}
