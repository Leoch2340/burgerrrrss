import {
    SET_BUN,
    ADD_INGREDIENT,
    DELETE_INGREDIENT,
    MOVE_INGREDIENT,
    CLEAR_CONSTRUCTOR
} from "../constants/constants"; // Импорт типов действий для конструктора бургера из констант

import { TIngredientType } from "../types/types"; // Импорт типа для ингредиента (возможно, это объект с данными ингредиента)
import { IAddIngredient, IClearConstructor, IDeleteIngredient, IMoveIngredient, ISetBun } from "./interfaces"; // Импорт интерфейсов для типов действий

// Действие для установки булочки в конструкторе
export const setBun = (bun: TIngredientType): ISetBun => ({ 
    type: SET_BUN, // Тип действия: установка булочки
    payload: bun // Булочка, которую нужно установить в конструкторе
});

// Действие для добавления ингредиента в конструктор
export const addIngredient = (ingredient: TIngredientType): IAddIngredient => ({ 
    type: ADD_INGREDIENT, // Тип действия: добавление ингредиента
    payload: ingredient // Ингредиент, который нужно добавить
});

// Действие для удаления ингредиента из конструктора
export const deleteIngredient = (ingredient: TIngredientType): IDeleteIngredient => ({ 
    type: DELETE_INGREDIENT, // Тип действия: удаление ингредиента
    payload: ingredient // Ингредиент, который нужно удалить
});

// Действие для перемещения ингредиента внутри конструктора
export const moveIngredient = (start: number, end: number): IMoveIngredient => ({ 
    type: MOVE_INGREDIENT, // Тип действия: перемещение ингредиента
    payload: { start, end } // Начальная и конечная позиции ингредиента
});

// Действие для очистки конструктора (например, сброс всех ингредиентов)
export const clearConstructor = (): IClearConstructor => ({ 
    type: CLEAR_CONSTRUCTOR // Тип действия: очистка конструктора
});
