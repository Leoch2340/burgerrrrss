import {
    ADD_INGREDIENT_DETAILS,
    DELETE_INGREDIENT_DETAILS
} from "../constants/constants" // Импорт констант для типов действий: добавление и удаление ингредиента в деталях
import { TIngredientType } from "../types/types" // Импорт типа для ингредиента, который будет добавляться или удаляться
import { IAddIngredientDetails, IDeleteIngredientDetails } from "./interfaces" // Импорт интерфейсов для действий добавления и удаления ингредиента в деталях

// Action creator для добавления ингредиента в детали
export const addIngredientDetails = (ingredient: TIngredientType): IAddIngredientDetails => ({
    type: ADD_INGREDIENT_DETAILS, // Тип действия: добавление ингредиента
    payload: ingredient // Сам ингредиент, который будет добавлен в детали
});

// Action creator для удаления ингредиента из деталей
export const deleteIngredientDetails = (): IDeleteIngredientDetails => ({
    type: DELETE_INGREDIENT_DETAILS // Тип действия: удаление ингредиента
});
