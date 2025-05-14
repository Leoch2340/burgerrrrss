import {
    SET_BUN, // Импортируем константу для действия установки булки.
    ADD_INGREDIENT, // Импортируем константу для действия добавления ингредиента.
    DELETE_INGREDIENT, // Импортируем константу для действия удаления ингредиента.
    MOVE_INGREDIENT, // Импортируем константу для действия перемещения ингредиента.
    CLEAR_CONSTRUCTOR // Импортируем константу для действия очистки конструктора.
} from "../constants/constants"; // Импортируем все константы действий из файла constants.
import { TUnionAction } from "../actions/interfaces"; // Импортируем тип для действий редуктора.
import { TIngredientType } from "../types/types"; // Импортируем тип для ингредиентов.

type TInitialState = { // Определяем тип начального состояния редуктора.
    mainList: Array<TIngredientType>, // Список основных ингредиентов (не булки).
    bunsList: Array<TIngredientType> // Список булок.
}

export const initialState: TInitialState = { // Инициализируем начальное состояние редуктора.
    mainList: [], // Список ингредиентов в конструкторе, кроме булок.
    bunsList: [] // Список булок в конструкторе.
}

export const burgerConstructorReducer = (state = initialState, action: TUnionAction): TInitialState => { // Определяем редуктор burgerConstructorReducer.
    switch (action.type) { // В зависимости от типа действия:
        case SET_BUN: { // Если тип действия — SET_BUN (установка булки),
            return { // Возвращаем новое состояние с обновлённым списком булок.
                ...state, // Сохраняем текущее состояние.
                bunsList: state.bunsList.find((item) => item._id === action.payload._id) ? [...state.bunsList] : [action.payload] // Если булка с таким id уже есть, то оставляем текущий список булок, иначе добавляем новую булку.
            }
        }
        case ADD_INGREDIENT: { // Если тип действия — ADD_INGREDIENT (добавление ингредиента),
            return { // Возвращаем новое состояние с обновлённым списком основных ингредиентов.
                ...state, // Сохраняем текущее состояние.
                mainList: [...state.mainList, action.payload] // Добавляем новый ингредиент в конец списка.
            }
        }
        case DELETE_INGREDIENT: { // Если тип действия — DELETE_INGREDIENT (удаление ингредиента),
            return { // Возвращаем новое состояние с обновлённым списком основных ингредиентов.
                ...state, // Сохраняем текущее состояние.
                mainList: state.mainList.filter((item) => item.id !== action.payload.id) // Удаляем ингредиент с заданным id из списка.
            }
        }
        case MOVE_INGREDIENT: { // Если тип действия — MOVE_INGREDIENT (перемещение ингредиента),
            let res = []; // Создаём временный массив для хранения изменённого списка ингредиентов.
            const { start, end } = action.payload; // Деструктурируем start и end из полезной нагрузки (позиции ингредиентов).

            if (start === end) { // Если начальная и конечная позиция одинаковы,
                return state // Просто возвращаем текущее состояние, ничего не меняем.
            } else if (start > end) { // Если начальная позиция больше конечной,
                res = [ // Перемещаем ингредиент с позиции start на позицию end.
                    ...state.mainList.slice(0, end), // Все элементы до позиции end.
                    state.mainList[start], // Ингредиент, который перемещаем.
                    ...state.mainList.slice(end, start), // Все элементы между end и start.
                    ...state.mainList.slice(start + 1), // Все элементы после start.
                ];
            } else { // Если start < end
                res = [ // Перемещаем ингредиент с позиции start на позицию end.
                    ...state.mainList.slice(0, start), // Все элементы до позиции start.
                    ...state.mainList.slice(start + 1, end + 1), // Все элементы между start и end.
                    state.mainList[start], // Ингредиент, который перемещаем.
                    ...state.mainList.slice(end + 1) // Все элементы после end.
                ]
            }
            return { // Возвращаем новое состояние с изменённым списком ингредиентов.
                ...state,
                mainList: res // Обновляем список ингредиентов.
            }
        }
        case CLEAR_CONSTRUCTOR: { // Если тип действия — CLEAR_CONSTRUCTOR (очистка конструктора),
            return { // Возвращаем новое состояние с пустыми списками.
                ...state, // Сохраняем текущее состояние.
                mainList: [], // Очищаем список основных ингредиентов.
                bunsList: [] // Очищаем список булок.
            }
        }
        default: { // Для всех других типов действий,
            return state; // Просто возвращаем текущее состояние.
        }
    }
}
