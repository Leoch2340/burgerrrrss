// Импортируем типизированный хук useSelector и хук useDispatch из библиотеки react-redux.
// Переименовываем useDispatch в dispatchHook, а useSelector в selectorHook.
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from "react-redux";

// Импортируем ThunkDispatch — тип для диспетчера, поддерживающего Redux Thunk.
import { ThunkDispatch } from "redux-thunk";

// Импортируем объединённый тип всех действий Redux (тип всех Action'ов).
import { TUnionAction } from "./actions/interfaces";

// Импортируем тип корневого состояния Redux-хранилища.
import { RootState } from "./types/types";

// Хук useDispatch с типом ThunkDispatch — позволяет использовать асинхронные экшены (thunk'и).
export const useDispatch = dispatchHook<ThunkDispatch<RootState, never, TUnionAction>>;

// Типизированный хук useSelector, привязанный к типу RootState — для получения данных из Redux-хранилища.
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
