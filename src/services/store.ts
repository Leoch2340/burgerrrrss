// Импортируем middleware redux-thunk для поддержки асинхронных экшенов.
import thunk from "redux-thunk";

// Импортируем корневой редьюсер, который объединяет все редьюсеры в приложении.
import { rootReducer } from "./reducers";

// Импортируем функции из Redux: compose (для объединения enhancers), 
// createStore (для создания Redux store), applyMiddleware (для применения middleware).
import { compose, createStore, applyMiddleware } from 'redux';

// Импортируем базовый URL WebSocket соединения.
import { wsUrl } from "../utils/constants";

// Импортируем объекты с WebSocket-экшенами для общего и пользовательского сокет-соединения.
import { wsActions, wsActionsUser } from "./actions/websockets";

// Импортируем middleware для обработки WebSocket соединений.
import { socketMiddleware } from "./middleware/socket-middleware";

// Импортируем функцию получения куки, используемую для авторизации WebSocket соединения.
import { getCookie } from "../utils/сookies";

// Расширяем глобальный интерфейс Window, чтобы избежать ошибок при использовании Redux DevTools.
declare global {
  interface Window {
    // Определяем тип Redux DevTools Enhancer, если он установлен в браузере.
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

// Если Redux DevTools доступен — используем его compose, иначе — стандартный compose из Redux.
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Создаём enhancer — расширение для Redux store, в котором применяем middleware:
const enhancer = composeEnhancers(
  applyMiddleware(
    thunk, // Асинхронные действия (thunk)
    // WebSocket middleware для ленты заказов (общий сокет без авторизации)
    socketMiddleware(() => wsUrl + '/all', wsActions),
    // WebSocket middleware для заказов пользователя (авторизованный сокет)
    socketMiddleware(() => wsUrl + `?token=${getCookie('access')}`, wsActionsUser),
  )
);

// Создаём Redux store, передавая корневой редьюсер и enhancer с middleware.
export const store = createStore(rootReducer, enhancer);
