// Импортируем тип ReactNode для типизации детей компонентов React.
import { ReactNode } from "react";

// Импортируем ThunkAction для работы с асинхронными действиями в Redux с использованием middleware redux-thunk.
import { ThunkAction } from 'redux-thunk';

// Импортируем ActionCreator для типизации функций, создающих Redux-экшены.
import { ActionCreator } from 'redux';

// Импортируем store для доступа к состоянию Redux.
import { store } from "../store";

// Импортируем типы действий из интерфейсов.
import { TUnionAction } from '../actions/interfaces';

// Тип для извлечения состояния из Redux-стора с помощью ReturnType.
export type RootState = ReturnType<typeof store.getState>;

// Тип для Dispatch функции из Redux, которая позволяет отправлять экшены в стор.
export type AppDispatch = typeof store.dispatch;

// Тип для Thunk-экшенов в Redux, которые могут быть асинхронными.
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, RootState, never, TUnionAction>
>;

// Тип для ингредиента бургера, описывающий его различные характеристики (калории, цена и другие).
export type TIngredientType = {
  calories: number,
  carbohydrates: number,
  fat: number,
  image: string,
  image_large: string,
  image_mobile: string,
  name: string,
  price: number,
  proteins: number,
  type: string,
  __v: number, // Это может быть версия документа в MongoDB.
  _id: string,  // Уникальный идентификатор ингредиента.
  id?: string,  // Дополнительный идентификатор, возможно для использования в UI.
}

// Тип для деталей ингредиента, которые будут показываться в модальном окне.
export type TIngredientDetails = {
  image_large?: string,
  name?: string,
  calories?: number,
  proteins?: number,
  fat?: number,
  carbohydrates?: number
}

// Тип для пользователя, с информацией о его статусе и данных (например, имя и email).
export type TUser = {
  success: boolean, // Статус операции.
  user: {
    name: string, // Имя пользователя.
    email: string, // Email пользователя.
  }
}

// Тип для описания параметров маршрута в React Router, включая фоновое состояние.
export type TLocation = {
  background: TLocation;
  hash: string;
  key: string;
  pathname: string;
  search: string;
  from: string;
  state: {
    background?: { // Состояние для фонового маршрута.
      pathname: string;
      search: string;
      hash: string;
      key: string;
    };
  };
}

// Тип для представления элемента, который содержит ингредиент и его тип.
export type TItem = {
  id: string, // Уникальный идентификатор элемента.
  ingredient: TIngredientType, // Ингредиент бургера.
  type: string, // Тип ингредиента (например, булка, мясо и т.д.)
}

// Тип для отображения ингредиента в списке ингредиентов бургера.
export type TBurgerIngredientsItem = {
  ingredient: TIngredientType
}

// Тип для элемента конструктора бургера, с его индексом и функцией для удаления.
export type TBurgerConstructorElement = {
  element: TIngredientType, // Ингредиент.
  id: string | undefined, // Идентификатор элемента.
  index: number, // Индекс элемента в списке.
  deleteElement: (element: TIngredientType) => void // Функция для удаления элемента.
}

// Тип для набора ингредиентов, может быть использован для фильтрации или отображения.
export type TBurgerIngredientsSet = {
  type: string // Тип набора (например, булки, мясо, овощи).
}

// Тип для модального окна, которое принимает детей и функцию для его закрытия.
export type TModal = {
  onClose?: () => void, // Функция для закрытия модала.
  children: ReactNode // Дочерние элементы, которые будут отображены в модале.
}

// Тип для наложения модала, с функцией для его закрытия.
export type TModalOverlay = {
  onClose: () => void // Функция для закрытия наложения.
}

// Тип для регистрации заказа, который требует обработки клика на кнопку.
export type TOrderRegistration = {
  handleOrderClick: () => void // Функция обработки клика для оформления заказа.
}

// Тип для описания заказа, включая ингредиенты, статус и другие данные.
export type TOrder = {
  ingredients: Array<string>, // Массив ингредиентов, связанных с заказом.
  _id: string, // Уникальный идентификатор заказа.
  status: string, // Статус заказа.
  number: number, // Номер заказа.
  createdAt: string, // Дата создания заказа.
  updatedAt: string, // Дата обновления заказа.
  name: string // Имя заказа.
}

// Тип для списка заказов с общей информацией, например, количество заказов и сумма.
export type TOrders = {
  success: boolean, // Статус успешности.
  orders: Array<TOrder>, // Массив заказов.
  total: number, // Общая сумма заказов.
  totalToday: number // Сумма заказов на сегодня.
}

// Тип для отображения заказов пользователя.
export type TUserOrders = {
  success: boolean, // Статус успешности.
  orders: Array<TOrder> // Массив заказов пользователя.
}

// Тип для отображения данных заказа в компоненте.
export type TOrderProps = {
  order: TOrder // Информация о заказе.
}

// Тип для формата даты и времени с параметрами для часового пояса и формата времени.
export type TOptionsDateFormat = {
  timezone: 'Moscow', // Часовой пояс (Москва).
  hour: 'numeric', // Час в формате числового значения.
  minute: 'numeric', // Минуты в формате числового значения.
  timeZoneName: "short", // Краткое имя часового пояса (например, "MSK").
}
