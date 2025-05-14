import {
    SET_ACTIVE_TAB,
    SCROLL_INGREDIENTS
} from "../constants/constants"; // Импорт типов действий для управления активной вкладкой и прокруткой ингредиентов

import { IScrollIngredients, ISetActiveTab } from "./interfaces"; // Импорт интерфейсов для типов действий

// Действие для установки активной вкладки
export const setActiveTab = (value: string): ISetActiveTab => ({ 
    type: SET_ACTIVE_TAB, // Тип действия: установка активной вкладки
    payload: value // Значение, которое будет установлено как активная вкладка
});

// Действие для прокрутки ингредиентов (например, для обновления состояния прокрутки)
export const scrollIngredients = (value: string): IScrollIngredients => ({ 
    type: SCROLL_INGREDIENTS, // Тип действия: прокрутка ингредиентов
    payload: value // Значение, которое будет использоваться для прокрутки (например, позиция или идентификатор ингредиента)
});
